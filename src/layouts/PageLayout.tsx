import React, { ReactElement } from 'react';

export default function PageLayout({ children }: { children: ReactElement }) {
  return (
    <div className="min-h-screen bg-white text-[#101827] dark:bg-[#101827] dark:text-white">
      <div className="max-w-4xl mx-auto px-4 py-6">{children}</div>
    </div>
  );
}
