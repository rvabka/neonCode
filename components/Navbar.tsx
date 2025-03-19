import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { auth, signOut, signIn } from '@/auth';
import { BadgePlus, LogOut } from 'lucide-react';

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-4 py-3 mt-3 font-work-sans w-[90%] mx-auto backdrop-blur-md bg-[#1B1C2C]/10 border-b border-[#1B1C2C]/20 shadow-md rounded-2xl">
      <nav className="flex justify-between items-center text-center">
        <Link
          className="flex items-center justify-center gap-1 hover:cursor-pointer"
          href="/"
        >
          <Image src="/logo.png" alt="logo" width={50} height={10} />
          <span className="font-thin text-white">
            neon<span className="font-bold text-neonColor">Code</span>
          </span>
        </Link>
        <div className="flex items-center justify-center gap-7 text-gray-300">
          {session && session?.user ? (
            <>
              <Link
                href="/posts/create"
                className="hover:cursor-pointer hover:text-white transition-colors"
              >
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
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
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden mt-1 text-red-500" />
                </button>
              </form>
              <Link
                href={`/user/${session.id}`}
                className="hover:cursor-pointer hover:text-white transition-colors"
              >
                <Image
                  src={session.user.image || ''}
                  alt={'Avatar'}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
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
