'use client';

import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

function SearchFormReset() {
  const reset = () => {
    const form = document.querySelector('search-form') as HTMLFormElement;
    if (form) form.reset();
  };

  return (
    <button
      type="reset"
      onClick={reset}
      className="w-8 h-8 bg-black rounded-full"
    >
      <Link href="/" className="flex justify-center items-center text-white">
        <X className="size-5" />
      </Link>
    </button>
  );
}

export default SearchFormReset;
