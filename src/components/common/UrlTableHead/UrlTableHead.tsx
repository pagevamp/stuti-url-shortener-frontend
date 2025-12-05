import { UrlTableHeadProps } from '@core/types/url-types';
import { sortFields, urlOrder, useUrls } from '@hooks/useUrls';
import { Button } from '../Button/Button';
import { Icon } from '@iconify/react';
import { TableHead } from '../../ui/table';

export const UrlTableHead = ({ field, type, children }: UrlTableHeadProps) => {
  const { sortOrderAsc, handleSortOrder } = useUrls();
  const isSorted = type == 'sorted';
  const order = sortOrderAsc ? urlOrder.ASC : urlOrder.DESC;

  return (
    <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-3 border-r w-[350px]">
      {isSorted && (
        <Button type="button" variant="ghost" size="icon">
          <Icon icon="tdesign:filter-sort" className="text-emerald-950" />
        </Button>
      )}
      {children}
      {isSorted && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => handleSortOrder(order, field as sortFields)}
        >
          <Icon
            icon={sortOrderAsc ? 'lucide:sort-desc' : 'lucide:sort-asc'}
            className="text-emerald-950"
          />
        </Button>
      )}
    </TableHead>
  );
};
