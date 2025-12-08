import React from 'react';

export const EditFormSkeletons = () => {
  return (
    <section className="flex flex-col gap-2 items-center">
      <div>
        <label className="text-black font-semibold text-shadow-gray-100">
          Title
        </label>
        <div className="bg-white text-sm text-undraw-secondary-100 font-bold min-w-80" />
      </div>
      <div>
        <label className="text-black font-semibold text-shadow-gray-100">
          Expiry Date
        </label>
        <div className="bg-white text-sm text-undraw-secondary-100 font-bold min-w-80" />
      </div>
    </section>
  );
};
