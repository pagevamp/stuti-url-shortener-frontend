import { useUrls } from '@/src/hooks/useUrls';
import { Icon } from '@iconify/react';
import React, { MouseEventHandler } from 'react';

export const Pagination = ({
  totalPages,
}: {
  totalPages: number;
}): React.ReactElement => {
  const { searchParams, handlePagination } = useUrls();
  const currentPage = Number(searchParams.get('page')) || 1;

  const previous: MouseEventHandler<HTMLButtonElement> = () => {
    handlePagination(Math.max(currentPage - 1, 1));
  };

  const next: MouseEventHandler<HTMLButtonElement> = () => {
    handlePagination(Math.min(currentPage + 1, totalPages));
  };

  const page: React.ReactElement = (
    <div className="grid grid-cols-3 items-center w-full justify-items-center">
      <button
        className="bg-gray-100 rounded-2xl p-2 flex flex-row gap-1 items-center max-w-20 "
        onClick={previous}
      >
        <Icon icon="icon-park-solid:back" />
        Prev
      </button>

      <span>
        Page{' '}
        <span className="text-emerald-950 font-semibold"> {currentPage} </span>
        of {totalPages}
      </span>
      <button
        className="bg-gray-100 rounded-2xl p-2 flex flex-row gap-1 items-center max-w-20"
        onClick={next}
      >
        Next
        <Icon icon="icon-park-solid:next" />
      </button>
    </div>
  );
  return page;
};
