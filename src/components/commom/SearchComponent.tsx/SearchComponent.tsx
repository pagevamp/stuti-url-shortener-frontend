import { useUrls } from '@/src/hooks/useUrls';
import { Icon } from '@iconify/react';
import React from 'react';

export const SearchComponent = () => {
  const { handleSearch } = useUrls();
  return (
    <div className="h-12 w-[40%] rounded-2xl border border-blue-950 bg-white items-center px-2 py-4 flex flex-row ">
      <input
        placeholder="Search for your url..."
        className="bg-transparent border-0 focus:outline-none focus:ring-0 overflow-hidden w-[90%]"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <Icon
        icon="ic:round-search"
        width={22}
        height={22}
        className="text-black mx-2"
      />
    </div>
  );
};
