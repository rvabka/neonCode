import { client } from '@/sanity/lib/client';
import { POSTS_QUERY } from '@/sanity/lib/queries';
import MaxWidthWrapper from '@/components/ui/ui/MaxWidthWrapper';
import ClientHome from './ClientHome';
import { PostTypeCard } from '@/components/PostCard';

export default async function Home() {
  const posts = await client.fetch<PostTypeCard[]>(POSTS_QUERY);

  return (
    <MaxWidthWrapper>
      <ClientHome post={posts} />
    </MaxWidthWrapper>
  );
}
