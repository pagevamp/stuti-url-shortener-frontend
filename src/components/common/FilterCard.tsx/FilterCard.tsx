import { useUrls } from '@/src/hooks/useUrls';
import React from 'react';
import { InputField } from '../InputField.tsx/InputField';

export const FilterCard = () => {
  const {
    closeFilter,
    filterError,
    filterFormData,
    handleFilterSubmit,
    handleFilterInputChange,
  } = useUrls();
  return (
    <section>
      <form
        className="flex flex-col gap-2 items-center z-100 inset-0 border border-undraw-secondary-100 w-fit p-4"
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
            input: 'bg-white text-sm text-undraw-secondary-100 font-bold w-fit',
            label: 'text-black font-semibold text-shadow-gray-100',
          }}
        />
        <button
          className="text-xs font-bold text-white bg-blue-950 border-0 rounded-2xl p-4"
          type="submit"
        >
          Filter
        </button>
      </form>

      <form
        className="flex flex-col gap-2 items-center z-100 inset-0 border border-undraw-secondary-100 w-fit p-4"
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
            input: 'bg-white text-sm text-undraw-secondary-100 font-bold w-fit',
            label: 'text-black font-semibold text-shadow-gray-100',
          }}
        />

        <button
          className="text-xs font-bold text-white bg-blue-950 border-0 rounded-2xl p-4"
          type="submit"
        >
          Filter
        </button>
      </form>
      <div className="flex flex-row items-center">
        <button
          className="text-xs font-bold text-white bg-red-950 border-0 rounded-2xl p-4"
          onSubmit={closeFilter}
        >
          Cancel
        </button>
      </div>
    </section>
  );
};
