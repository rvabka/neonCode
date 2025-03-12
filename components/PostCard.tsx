import React from 'react';
import { formatDate } from '@/lib/utils';
import { EyeIcon, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Author, Post } from '@/sanity/types';

export type PostTypeCard = Omit<Post, 'author'> & { author?: Author };

const PostCard = ({ post }: { post: PostTypeCard }) => {
  
  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <li className="text-white bg-gray-900 p-5 rounded-lg shadow-lg shadow-gray-800 hover:bg-gray-[#1a1a1a] hover:shadow-neonColor transition-all duration-400">
      <div className="flex gap-5 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link href={`/user/${post.author?._id}`}>
              <Image
                src="https://placehold.co/400x400"
                alt="placeholder"
                width={48}
                height={48}
                className="rounded-full"
              />
            </Link>
            <div className="flex justify-between w-full">
              <Link href={`/user/${post.author?._id}`}>
                <p className="text-gray-400 text-xs">Created by:</p>
                <p className="text-16-medium line-clamp-1 font-bold">
                  {post.author?.name}
                </p>
              </Link>
              <div className="flex justify-center gap-1">
                <span className="text-16-medium text-center flex gap-1 text-neonColor">
                  {post.views}
                  <EyeIcon className="size-6 text-neonColor" />{' '}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link
        href={`/posts/${post._id}`}
        className="flex justify-center items-center flex-col"
      >
        <div className="relative w-full h-48">
          <Image
            src={post.image ?? 'https://placehold.co/400x400'}
            alt={post.title ?? 'placeholder'}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      </Link>
      <div className="flex-col mt-2">
        <Link href={`/posts/${post._id}`}>
          <h3 className="font-bold text-2xl tracking-normal ">{post.title}</h3>
          <p className="font-light text-base text-gray-400 mt-2">
            {truncateText(post.description, 100)}
          </p>
        </Link>
        <p className="flex items-center gap-1 text-sm text-gray-400 mt-2 tracking-wide">
          {' '}
          <Calendar className="size-4" /> {formatDate(post._createdAt)}
        </p>
      </div>

      <div className="flex justify-between items-center gap-3 mt-5">
        <Button
          className="bg-gray-400 px-4 hover:bg-gray-500 transition-colors"
          asChild
        >
          <Link href={`/posts/${post._id}`}>Details</Link>
        </Button>
        <Link
          href={`/?query=${post.category?.toLowerCase() ?? 'uncategorized'}`}
        >
          <p className="text-lg text-neonColor font-thin">
            {post.category ?? 'Uncategorized'}
          </p>
        </Link>
      </div>
    </li>
  );
};

export default PostCard;
