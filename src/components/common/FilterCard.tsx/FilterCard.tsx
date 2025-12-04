import { useUrls } from '@/src/hooks/useUrls';
import React from 'react';
import { InputField } from '../InputField.tsx/InputField';

export const FilterCard = () => {
  const {
    filterError,
    filterFormData,
    handleFilterSubmit,
    handleFilterInputChange,
  } = useUrls();
  return (
    <section>
      <form
        className="flex flex-row gap-1 items-center z-100 border border-undraw-secondary-100 w-fit p-1"
        onSubmit={(e) => {
          e.preventDefault();
          handleFilterSubmit(e);
        }}
      >
        <InputField
          name="start_date"
          type="date"
          labelName="Start Date"
          icon="line-md:calendar"
          placeholder="Enter Start Date"
          value={filterFormData.start_date}
          error={filterError?.start_date}
          
          onChange={(e) => handleFilterInputChange(e)}
          classNames={{
            input:
              'bg-white text-xs text-undraw-secondary-100 font-light w-fit h-6',
            label: 'text-black font-normal text-shadow-gray-100 text-xs',
          }}
        />
        <button className="text-xs font-bold text--blue-950">Filter</button>
      </form>

      <form
        className="flex flex-row gap-1 items-center z-100 border border-undraw-secondary-100 w-fit p-1"
        onSubmit={(e) => {
          e.preventDefault();
          handleFilterSubmit(e);
        }}
      >
        <InputField
          name="end_date"
          type="date"
          labelName="End Date"
          icon="line-md:calendar"
          placeholder="Enter End Date"
          value={filterFormData.end_date}
          error={filterError?.end_date}
          onChange={(e) => handleFilterInputChange(e)}
          classNames={{
            input:
              'bg-white text-xs text-undraw-secondary-100 font-light w-fit h-6',
            label: 'text-black font-normal text-shadow-gray-100 text-xs',
          }}
        />

        <button className="text-xs font-bold text--blue-950" type="submit">
          Filter
        </button>
      </form>
    </section>
  );
};
