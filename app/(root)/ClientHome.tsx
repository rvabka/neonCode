'use client';
import SearchForm from '../../components/SearchForm';
import PostCard from '../../components/PostCard';
import { Typewriter } from 'react-simple-typewriter';
import { PostTypeCard } from '../../components/PostCard';

const ClientHome = ({
  post,
  query
}: {
  post: PostTypeCard[];
  query?: string;
}) => {
  return (
    <div className="flex items-center justify-center flex-col min-h-4/5 mt-4 w-full">
      <section className="max-w-full p-8 text-center">
        <h1 className="text-3xl font-bold text-white text-center mb-4 mx-auto md:text-4xl lg:text-5xl sm:min-w-[420px]">
          Neon lights, late nights, and <br />
          <span className="text-neonColor inline-block">
            <Typewriter
              words={['infinite loops...', 'loops...']}
              loop={1}
              cursor
              cursorStyle="_"
              typeSpeed={225}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h1>
        <p className="text-lg w-3/4 text-gray-300 mx-auto mb-4 lg:text-xl lg:w-full">
          Check out the latest articles and level up your coding skills!
        </p>
        <SearchForm query={query} />
      </section>

      <section className="sm:px-6 px-2 py-10 w-full mx-auto">
        <p className="text-2xl text-white text-center font-bold first-letter:text-2xl tracking-wide">
          {query ? `Search results for "${query}"` : 'Latest articles'}
        </p>
        <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5 sm:px-5 w-full">
          {post?.length > 0 ? (
            post.map((post: PostTypeCard) => (
              <PostCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="text-white">No articles found</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default ClientHome;
