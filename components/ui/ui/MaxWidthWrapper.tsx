import React from 'react';

const MaxWidthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {children}
    </div>
  );
};

export default MaxWidthWrapper;