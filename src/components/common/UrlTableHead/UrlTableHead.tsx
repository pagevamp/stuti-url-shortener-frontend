import { UrlTableHeadProps } from '@core/types/url-types';
import { useUrls } from '@hooks/useUrls';
import { Button } from '../Button/Button';
import { Icon } from '@iconify/react';
import { TableHead } from '../../ui/table';
import { FilterCard } from '../FilterCard';
import { sortFields, urlOrder } from '@/features/urls/constants';

export const UrlTableHead = ({ field, type, children }: UrlTableHeadProps) => {
  const {
    filterCardOpen,
    setFilterCardOpen,
    sortOrderAsc,
    handleSortOrder,
    handleFilterFields,
  } = useUrls();
  const isSorted = type == 'sorted';
  const order = sortOrderAsc ? urlOrder.ASC : urlOrder.DESC;
  const icon = sortOrderAsc ? 'lucide:sort-desc' : 'lucide:sort-asc';

  const toggleCard = () => {
    setFilterCardOpen(!filterCardOpen);
  };

  return (
    <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-3 border-r w-[350px]">
      <div className="flex flex-row gap-2 items-center">
        {isSorted && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              toggleCard();
              handleFilterFields(field as sortFields);
            }}
          >
            <Icon icon="tdesign:filter-sort" className="text-emerald-950" />
          </Button>
        )}
        {children}
        {isSorted && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => (handleSortOrder(order, field as sortFields))}
          >
            <Icon icon={icon} className="text-emerald-950" />
          </Button>
        )}
      </div>
      {filterCardOpen && <FilterCard />}
    </TableHead>
  );
};
