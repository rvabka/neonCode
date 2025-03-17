import React from 'react';
import { formatDate } from '@/lib/utils';
import { EyeIcon, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Author, Post } from '@/sanity/types';

export type PostTypeCard = Omit<Post, 'author'> & { author?: Author };

const PostCard = ({ post }: { post: PostTypeCard }) => {

  return (
    <li className="text-white relative bg-gray-900 p-6 rounded-xl shadow-lg shadow-gray-800 hover:bg-[#1a1a1a] hover:shadow-neonColor transition-all duration-400 flex flex-col gap-4">
      {/* Górna sekcja */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={post.author?._id ? `/user/${post.author._id}` : '#'}>
            <Image
              src={post.author?.image ?? 'https://placehold.co/48/48'}
              alt={post.author?.name ?? 'Unknown author'}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
          <div>
            <p className="text-gray-400 text-xs">Created by:</p>
            <Link href={post.author?._id ? `/user/${post.author._id}` : '#'}>
              <p className="text-16-medium font-bold">{post.author?.name}</p>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-1 text-neonColor">
          <EyeIcon className="size-5" /> {post.views}
        </div>
      </div>

      {/* Obrazek */}
      <Link href={post._id ? `/posts/${post._id}` : '#'}>
        <div className="relative w-full h-44 rounded-xl overflow-hidden">
          <Image
            src={post.image ?? 'https://placehold.co/400x400'}
            alt={post.title ?? 'Untitled Post'}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Link>

      {/* Treść */}
      <div className="flex flex-col gap-2">
        <Link href={post._id ? `/posts/${post._id}` : '#'}>
          <h3 className="font-bold text-xl tracking-normal line-clamp-3 mb-2">
            {post.title}
          </h3>
          <p className="text-base text-gray-400 line-clamp-4">
            {post.description}
          </p>
        </Link>
        <p className="flex items-center gap-1 text-sm text-gray-400">
          <Calendar className="size-4" /> {formatDate(post._createdAt)}
        </p>
      </div>

      {/* Dolna sekcja */}
      <div className="flex justify-between items-center mt-auto">
        <Button
          className="bg-gray-400 px-4 hover:bg-gray-500 transition-colors"
          asChild
        >
          <Link href={post._id ? `/posts/${post._id}` : '#'}>Details</Link>
        </Button>
        <Link
          href={`/?query=${(post.category ?? 'Uncategorized').toLowerCase()}`}
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
