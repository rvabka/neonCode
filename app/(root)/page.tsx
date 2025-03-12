import { POSTS_QUERY } from '@/sanity/lib/queries';
import MaxWidthWrapper from '@/components/ui/ui/MaxWidthWrapper';
import ClientHome from './ClientHome';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';

// ⬇ Pobieranie searchParams w Server Component!
export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({
    query: POSTS_QUERY,
    params
  });

  return (
    <MaxWidthWrapper>
      <ClientHome post={posts} query={query} />
      <SanityLive />
    </MaxWidthWrapper>
  );
}
