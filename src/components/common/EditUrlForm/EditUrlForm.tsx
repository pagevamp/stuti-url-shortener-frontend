import React from 'react';
import { InputField } from '@components/common/InputField';
import { useUrls } from '@/hooks/useUrls';
import { Button } from '../Button';
import { UrlFormProps } from '@/core/types/url-types';

export const EditUrlForm = ({ tableId, closeModal }: UrlFormProps) => {
  const { editFormData, error, handleEditFormInputChange, handleEditSubmit } =
    useUrls();

  return (
    <form
      className="flex flex-col gap-2 items-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleEditSubmit(e, tableId!);
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
        value={
          editFormData.expiresAt
            ? new Date(editFormData.expiresAt).toISOString().split('T')[0]
            : ''
        }
        error={error?.expiresAt}
        onChange={handleEditFormInputChange}
        classNames={{
          input:
            'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
          label: 'text-black font-semibold text-shadow-gray-100',
        }}
      />

      <div className="flex flex-row gap-4 mt-4">
        <Button
          className="text-md font-bold text-white bg-red-950 border-0 rounded-2xl p-2 cursor-pointer"
          type="button"
          onClick={closeModal}
        >
          Cancel
        </Button>

        <Button
          className="text-md font-bold text-white bg-blue-950 border-0 rounded-2xl p-2 cursor-pointer"
          type="submit"
        >
          Edit URL
        </Button>
      </div>
    </form>
  );
};
