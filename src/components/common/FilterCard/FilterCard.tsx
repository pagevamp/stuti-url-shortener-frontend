import { useSearchParams } from 'next/navigation';
import { InputField } from '../InputField';
import { useUrls } from '@/hooks/useUrls';

export const FilterCard = () => {
  const { filterFormData, handleFilterInputChange } = useUrls();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const start = params.get('start_date');
  const end = params.get('start_date');

  return (
    <section className="w-full top-0 left-0 absolute backdrop-blur-3xl rounded-3xl mx-auto border border-undraw-secondary-100">
      <div className="flex flex-col gap-1 items-center z-100 border-0 rounded-3xl w-full px-2 py-1">
        <InputField
          name="start_date"
          type="date"
          labelName="Start Date"
          icon="line-md:calendar"
          placeholder="Enter Start Date"
          onChange={handleFilterInputChange}
          value={filterFormData.start_date.toString() || start?.toString()}
          classNames={{
            input:
              'bg-undraw-secondary-100 text-sm text-white font-light h-8 w-full',
            label:
              'text-undraw-secondary-100 font-bold text-shadow-gray-500 text-xs',
          }}
        />

        <InputField
          name="end_date"
          type="date"
          labelName="End Date"
          icon="line-md:calendar"
          placeholder="Enter End Date"
          value={filterFormData.end_date.toString() || end?.toString()}
          onChange={handleFilterInputChange}
          classNames={{
            input:
              'bg-undraw-secondary-100 text-sm text-white font-light h-8 w-full',
            label:
              'text-undraw-secondary-100 font-bold text-shadow-gray-500 text-xs',
          }}
        />
      </div>
    </section>
  );
};
