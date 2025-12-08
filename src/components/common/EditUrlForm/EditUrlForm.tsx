import React from 'react';
import { InputField } from '@components/common/InputField';
import { useUrls } from '@/hooks/useUrls';
import { Button } from '../Button';

export const EditUrlForm = () => {
  const { editFormData, error, handleEditFormInputChange, handleEditSubmit } =
    useUrls();

  return (
    <form
      className="flex flex-col gap-2 items-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleEditSubmit(e);
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
        onChange={handleEditFormInputChange}
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
        value={editFormData.expiresAt.toString()}
        error={error?.expiresAt}
        onChange={handleEditFormInputChange}
        classNames={{
          input:
            'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
          label: 'text-black font-semibold text-shadow-gray-100',
        }}
      />

      <Button
        className="text-md font-bold text-white bg-blue-950 border-0 rounded-2xl p-4 mb-6"
        type="submit"
      >
        Edit URL
      </Button>
    </form>
  );
};
