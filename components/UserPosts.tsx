import { client } from '@/sanity/lib/client';
import { POSTS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries';
import React from 'react';
import PostCard, { PostTypeCard } from './PostCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';

const UserPosts = async ({ id }: { id: string }) => {
  const posts = await client.fetch(POSTS_BY_AUTHOR_QUERY, { id });

  return (
    <div className="w-full relative h-full">
      {posts.length > 0 ? (
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            skipSnaps: false,
            dragFree: false,
            containScroll: 'trimSnaps',
            slidesToScroll: 1
          }}
          className="w-full"
        >
          <CarouselContent>
            {posts.map(post => (
              <CarouselItem
                key={post._id}
                className="md:basis-1/2 flex justify-center"
              >
                <div className="w-full max-w-full p-2">
                  <PostCard post={post as PostTypeCard} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="text-white text-center py-6">No posts found</div>
      )}
    </div>
  );
};

export default UserPosts;
