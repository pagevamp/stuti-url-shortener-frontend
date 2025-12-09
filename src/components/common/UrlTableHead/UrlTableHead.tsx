import { UrlTableHeadProps } from '@core/types/url-types';
import { useUrls } from '@hooks/useUrls';
import { Button } from '../Button/Button';
import { Icon } from '@iconify/react';
import { TableHead } from '../../ui/table';
import { FilterCard } from '../FilterCard';
import { SortFields, UrlOrder } from '@/features/urls/constants';
import { Popover } from '@radix-ui/react-popover';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export const UrlTableHead = ({ field, type, children }: UrlTableHeadProps) => {
  const {
    searchParams,
    filterCardOpen,
    setFilterCardOpen,
    sortOrderAsc,
    handleSortOrder,
    handleFilterFields,
  } = useUrls();
  const isSorted = type == 'sorted';
  const params = new URLSearchParams(searchParams);
  const getField = params.get('filterField');
  const order = sortOrderAsc ? UrlOrder.ASC : UrlOrder.DESC;
  const icon = sortOrderAsc ? 'lucide:sort-desc' : 'lucide:sort-asc';

  const toggleCard = () => {
    setFilterCardOpen(!filterCardOpen);
  };

  return (
    <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-3 border-r w-[350px]">
      <div className="flex flex-row gap-2 items-center">
        {isSorted && (
          <Popover>
            <PopoverTrigger
              type="button"
              className="h-5 w-5 p-0 m-0"
              onClick={() => {
                toggleCard();
                handleFilterFields(field as SortFields);
              }}
            >
              <Icon
                icon={
                  getField !== field
                    ? 'lsicon:filter-outline'
                    : 'lsicon:filter-filled'
                }
                className="text-emerald-950"
              />
            </PopoverTrigger>

            {filterCardOpen && (
              <PopoverContent className='bg-transparent border-0'>
                <FilterCard />
              </PopoverContent>
            )}
          </Popover>
        )}

        {children}
        {isSorted && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleSortOrder(order, field as SortFields)}
          >
            <Icon icon={icon} className="text-emerald-950" />
          </Button>
        )}
      </div>
    </TableHead>
  );
};
