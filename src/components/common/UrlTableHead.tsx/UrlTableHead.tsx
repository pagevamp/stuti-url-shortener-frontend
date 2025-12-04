import { UrlTableHeadProps } from '@/src/core/types/url-types';
import { useUrls } from '@/src/hooks/useUrls';
import React from 'react';
import { Button } from '../Button/Button';
import { Icon } from '@iconify/react';
import { TableHead } from '../../ui/table';

export const UrlTableHead = ({ title, type, children }: UrlTableHeadProps) => {
  const { sortOrderAsc, handleSortOrder } = useUrls();
  const isSorted = type == 'sorted';
  const order = sortOrderAsc === true ? 'ASC' : 'DESC';
  return (
    <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-3 border-r w-[350px]">
      {isSorted && (
        <Button
          type="reset"
          variant="ghost"
          title={title}
          size="icon"
          onClick={(event) =>
            handleSortOrder(order, event.currentTarget.title.toString())
          }
        >
          <Icon
            icon={
              sortOrderAsc === true ? 'lucide:sort-desc' : 'lucide:sort-asc'
            }
            className="text-emerald-950"
          />
        </Button>
      )}
      {children}
    </TableHead>
  );
};
