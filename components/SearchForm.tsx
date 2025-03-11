import React from 'react';
import Form from 'next/form';
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="search-form relative w-full sm:w-3/4 mx-auto"
    >
      <input
        type="text"
        name="query"
        defaultValue={query}
        placeholder="Search for posts..."
        className="w-full px-4 py-2 text-gray-900 bg-white border-2 border-neonColor rounded-xl focus:outline-none focus:ring focus:ring-neonColor focus:border-neonColor transition-all"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
        {query && <SearchFormReset />}
        <button
          type="submit"
          className="flex justify-center items-center w-8 h-8 bg-black rounded-full text-white"
        >
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
