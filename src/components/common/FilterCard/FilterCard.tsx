import { useSearchParams } from 'next/navigation';
import { InputField } from '../InputField';
import { filterDates, useUrls } from '@/hooks/useUrls';

export const FilterCard = () => {
  const { filterFormData, handleFilterInputChange } = useUrls();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const type = params.get('filterType');
  const prev = params.get('filterDate');

  return (
    <section className="mx-auto">
      <div className="flex flex-row gap-1 items-center z-100 border border-undraw-secondary-100 w-fit px-4 py-1">
        <InputField
          name="start_date"
          type="date"
          labelName="Start Date"
          icon="line-md:calendar"
          placeholder="Enter Start Date"
          value={
            filterFormData.start_date || type === filterDates.START_DATE
              ? prev!
              : ''
          }
          onChange={handleFilterInputChange}
          classNames={{
            input:
              'bg-white text-xs text-undraw-secondary-100 font-light w-fit h-6',
            label: 'text-black font-normal text-shadow-gray-100 text-xs',
          }}
        />
      </div>

      <div className="flex flex-row gap-1 items-center z-100 border border-undraw-secondary-100 w-fit px-4 py-1">
        <InputField
          name="end_date"
          type="date"
          labelName="End Date"
          icon="line-md:calendar"
          placeholder="Enter End Date"
          value={
            filterFormData.end_date || type === filterDates.END_DATE
              ? prev!
              : ''
          }
          onChange={handleFilterInputChange}
          classNames={{
            input:
              'bg-white text-xs text-undraw-secondary-100 font-light w-fit h-6',
            label: 'text-black font-normal text-shadow-gray-100 text-xs',
          }}
        />
      </div>
    </section>
  );
};
