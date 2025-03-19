import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import {
  AUTHOR_BY_ID_QUERY,
  POSTS_BY_AUTHOR_QUERY_NUMBER
} from '@/sanity/lib/queries';
import { UserIcon, Mail, Code, InfoIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Suspense } from 'react';
import UserPosts from '@/components/UserPosts';
import { PostCardSkeleton } from '@/components/PostCard';

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  const postsNumber = await client.fetch(POSTS_BY_AUTHOR_QUERY_NUMBER, { id });

  if (!user) return notFound();

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center mt-4 mx-auto px-4 gap-6 max-h-1/4">
        {/* Profil użytkownika */}
        <div className="w-full flex justify-center items-center lg:w-max-2xl lg:max-w-md mx-auto rounded-lg overflow-hidden shadow-md shadow-neonColor bg-gray-900">
          <div className="flex flex-col items-center px-6 pt-6 pb-6">
            {/* Avatar */}
            <div className="mb-4">
              <div className="rounded-full h-40 w-40 border-4 border-gray-800 overflow-hidden shadow-lg">
                {user?.image ? (
                  <Image
                    src={user.image || '/placeholder.svg'}
                    alt={user?.name || 'User'}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-800">
                    <UserIcon size={64} className="text-[#c4f36d]" />
                  </div>
                )}
              </div>
            </div>

            {/* Informacje o użytkowniku */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">
                {user?.name || 'Anonymous User'}
              </h1>
              <p className="text-[#c4f36d] font-medium">
                @{user?.username || 'username'}
              </p>
              <p className="text-gray-400 mt-2">
                {user?.bio || 'No bio available'}
              </p>

              {/* Dane użytkownika */}
              <div className="mt-4 bg-gray-800/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail size={18} className="text-[#c4f36d]" />
                  <span>{user?.email || 'email@example.com'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 mt-2">
                  <InfoIcon size={18} className="text-[#c4f36d]" />
                  <span className="font-mono text-sm">
                    ID: {user?._id || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 mt-2">
                  <Code size={18} className="text-[#c4f36d]" />
                  <span>Developer</span>
                </div>
              </div>

              {/* Statystyki */}
              <div className="flex justify-center gap-6 mt-6">
                <div className="text-center">
                  <span className="block text-[#c4f36d] font-bold text-xl">
                    {postsNumber.length}
                  </span>
                  <span className="text-gray-400 text-sm">Articles</span>
                </div>
                <div className="text-center">
                  <span className="block text-[#c4f36d] font-bold text-xl">
                    1.2k
                  </span>
                  <span className="text-gray-400 text-sm">Followers</span>
                </div>
                <div className="text-center">
                  <span className="block text-[#c4f36d] font-bold text-xl">
                    156
                  </span>
                  <span className="text-gray-400 text-sm">Following</span>
                </div>
              </div>

              {/* Przyciski */}
              <div className="flex justify-center gap-4 mt-6">
                <button className="px-6 py-2 bg-[#c4f36d] text-gray-900 rounded-md font-medium hover:bg-[#b3e45c] transition-colors">
                  Follow
                </button>
                <button className="px-6 py-2 bg-gray-800 text-gray-300 rounded-md font-medium hover:bg-gray-700 transition-colors">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Karuzela postów */}
        <div className="w-full lg:w-[60%] mt-8 lg:mt-0">
          <div className="bg-gray-900 rounded-lg shadow-md shadow-neonColor p-5">
            <h2 className="text-2xl mb-3 border-[#c4f36d] pl-2 text-center text-white">
              User Articles📝
            </h2>
            <Suspense fallback={<PostCardSkeleton />}>
              <UserPosts id={id} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
