import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { auth, signOut, signIn } from '@/auth';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-4 py-3 mt-3 font-work-sans w-[90%] mx-auto backdrop-blur-md bg-[#1B1C2C]/10 border-b border-[#1B1C2C]/20 shadow-md rounded-2xl">
      <nav className="flex justify-between items-center">
        <Link
          className="flex items-center justify-center gap-1 hover:cursor-pointer"
          href="/"
        >
          <Image src="/logo.png" alt="logo" width={50} height={10} />
          <span className="font-thin text-white">
            neon<span className="font-bold text-neonColor">Code</span>
          </span>
        </Link>
        <div className="flex items-center gap-10 text-gray-300">
          {session && session?.user ? (
            <>
              <Link
                href="/posts/create"
                className="hover:cursor-pointer hover:text-white transition-colors"
              >
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button
                  className="hover:cursor-pointer hover:text-white transition-colors"
                  type="submit"
                >
                  Logout
                </button>
              </form>
              <Link
                href={`/user/${session?.user?.id}`}
                className="hover:cursor-pointer hover:text-white transition-colors"
              >
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn('github');
              }}
            >
              <button
                className="hover:cursor-pointer hover:text-white transition-colors"
                type="submit"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
