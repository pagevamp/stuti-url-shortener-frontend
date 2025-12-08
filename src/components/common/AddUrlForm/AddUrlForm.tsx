import { InputField } from '@components/common/InputField';
import { useUrls } from '@/hooks/useUrls';
import { Button } from '../Button';

export const AddUrlForm = () => {
  const { addFormData, error, handleAddSubmit, handleAddFormInputChange } =
    useUrls();

  return (
    <form
      className="flex flex-col gap-2 items-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddSubmit(e);
      }}
    >
      <InputField
        name="title"
        type="text"
        labelName="Title"
        icon="fluent:slide-text-title-edit-16-regular"
        placeholder="Enter Title"
        value={addFormData.title}
        error={error?.title}
        onChange={handleAddFormInputChange}
        classNames={{
          input:
            'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
          label: 'text-black font-semibold text-shadow-gray-100',
        }}
      />
      <InputField
        name="originalUrl"
        type="text"
        labelName="Original Url"
        icon="flowbite:link-outline"
        placeholder="Enter Url"
        value={addFormData.originalUrl}
        error={error?.originalUrl}
        onChange={handleAddFormInputChange}
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
        value={addFormData.expiresAt.toString()}
        error={error?.expiresAt}
        onChange={handleAddFormInputChange}
        classNames={{
          input:
            'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
          label: 'text-black font-semibold text-shadow-gray-100',
        }}
      />

      <Button
        className="text-md font-bold text-white bg-blue-950 border-0 rounded-2xl p-4 mb-4"
        type="submit"
      >
        Add URL
      </Button>
    </form>
  );
};
