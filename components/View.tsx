import React from 'react';
import Ping from './Ping';
import { POST_VIEWS_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/writeClient';
import { after } from 'next/server';

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(POST_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="text-[16px] bg-neonColor px-4 py-2 rounded-lg capitalize font-medium">
        <span className="text-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
