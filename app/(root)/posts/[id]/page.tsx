import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, POST_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import React, { Suspense } from 'react';
import Link from 'next/link';
import markdownit from 'markdown-it';
import hljs from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';
import 'highlight.js/styles/github-dark.css';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import PostCard, { PostTypeCard } from '@/components/PostCard';

hljs.registerLanguage('typescript', typescript);
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="mt-3 mb-6 shadow-2xl"><code class="hljs rounded-xl">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (__) {}
    }

    return (
      '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  }
});

export const experimental_ppr = true;

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  // ważne pobieranie dla lepszego pobierania
  const [post, editorPosts] = await Promise.all([
    client.fetch(POST_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: 'featured-posts'
    })
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || '');

  return (
    <div className="max-w-4xl mx-auto px-3">
      <section className="flex items-center justify-center flex-col min-h-[230px] text-white text-center py-10">
        <p className="px-4 p-2 mb-2 bg-neonColor text-black block font-thin rounded-lg shadow-2xl">
          {formatDate(post?._createdAt)}
        </p>
        <h1 className="text-white text-4xl my-3 font-bold tracking-wide">
          {post.title}
        </h1>
        <p className="text-xl font-light mt-5 backdrop-blur-md bg-[#1B1C2C]/10 border-b border-[#1B1C2C]/20 shadow-md rounded-xl p-2">
          {post.description}
        </p>
      </section>

      <section className="relative">
        <Image
          src={post.image ?? 'https://placehold.co/400x400'}
          alt={post.title ?? 'Post image'}
          layout="responsive"
          width={200}
          height={200}
          className="rounded-xl"
        />
        <div className="space-y-5 mt-10">
          <div className="flex justify-between items-center gap-5 backdrop-blur-md bg-[#1B1C2C]/10 border-b border-[#1B1C2C]/20 shadow-md rounded-xl p-2">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex items-center justify-center gap-5"
            >
              <Image
                src={post.author?.image ?? 'https://placehold.co/64/64'}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-white">{post.author?.name}</p>
                <p className="text-gray-400">@{post.author?.username}</p>
              </div>
            </Link>
            <p className="flex flex-col text-center px-4 py-2 text-xl text-neonColor font-bold rounded-lg shadow-2xl">
              <span className="text-gray-400 text-sm font-normal">
                Post category{' '}
              </span>
              {post.category}
            </p>
          </div>
          {parsedContent ? (
            <article
              className="prose text-white max-w-4xl break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p>No content</p>
          )}
        </div>
        <hr className="border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />

        {(editorPosts?.select?.length ?? 0) > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="font-semibold text-2xl text-white text-center">
              Featured posts
            </p>

            <ul className="mt-7 grid sm:grid-cols-3 grid-cols-1 gap-5">
              {editorPosts?.select?.map((post, index: number) => (
                <PostCard key={index} post={post as unknown as PostTypeCard} />
              )) ?? []}
            </ul>
          </div>
        )}

        <Suspense
          fallback={
            <Skeleton className="bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />
          }
        >
          <View id={id} />
        </Suspense>
      </section>
    </div>
  );
};

export default Page;
