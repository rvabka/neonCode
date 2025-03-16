import React from 'react';
import StartupForm from '@/components/PostForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth();
  if (!session) redirect('/');

  return (
    <div className="max-w-4xl mx-auto px-3 text-white">
      <section className="flex items-center justify-center flex-col min-h-[150px] text-center py-10">
        <h1 className="text-4xl my-4 font-bold tracking-wide">
          Create new <span className="text-neonColor italic">post</span> on
          blog!✍🏼
        </h1>
      </section>

      <StartupForm />
    </div>
  );
};

export default Page;
