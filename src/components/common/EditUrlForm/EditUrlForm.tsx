import React from 'react';
import { InputField } from '@components/common/InputField';
import { useUrls } from '@/hooks/useUrls';

export const EditUrlForm = () => {
  const {
    editFormData,
    error,
    closeModal,
    handleFormInputChange,
    handleSubmit,
  } = useUrls();

  return (
    <form
      className="flex flex-col gap-2 items-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <InputField
        name="title"
        type="text"
        labelName="Title"
        icon="fluent:slide-text-title-edit-16-regular"
        placeholder="Enter Title"
        value={editFormData.title}
        error={error?.title}
        onChange={handleFormInputChange}
        classNames={{
          input:
            'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
          label: 'text-black font-semibold text-shadow-gray-100',
        }}
      />
      <InputField
        name="expiresAt"
        type="date"
        labelName="Expiry Date"
        icon="line-md:calendar"
        placeholder="Enter Expiry Date"
        value={editFormData.expiresAt}
        error={error?.expiresAt}
        onChange={handleFormInputChange}
        classNames={{
          input:
            'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
          label: 'text-black font-semibold text-shadow-gray-100',
        }}
      />

      <div className="flex flex-row gap-4 mt-4">
        <button
          className="text-xs font-bold text-white bg-red-950 border-0 rounded-2xl p-4"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="text-xs font-bold text-white bg-blue-950 border-0 rounded-2xl p-4"
          type="submit"
        >
          Edit URL
        </button>
      </div>
    </form>
  );
};
