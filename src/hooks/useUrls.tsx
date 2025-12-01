'use client';
import Modal from '../components/commom/Modal/Modal';
import { InputField } from '../components/commom/InputField.tsx/InputField';
import {
  ChangeEvent,
  FormEventHandler,
  MouseEventHandler,
  useState,
} from 'react';
import { ConfirmationDialogBox } from '../components/commom/ConfirmationBox/ConfirmationDialogBox';

export function useUrls() {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: 'hello',
    expiresAt: 'hello',
  });

  const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const handleCloseConfirmation: MouseEventHandler<HTMLButtonElement> = () => {
    setConfirmationOpen(false);
  };

  const handleCloseModal: MouseEventHandler<HTMLButtonElement> = () => {
    setModalOpen(false);
  };

  const handleEdit: FormEventHandler<Element> = () => {
    return ConfirmationDialogBox({
      isOpen: confirmationOpen,
      title: 'Edit Confirmation Modal',
      message: <span>Are you sure you want to edit this URL</span>,
      trigger: 'EDIT',
      onCancel: handleCloseConfirmation,
      onConfirm: handleCloseConfirmation,
    });
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setConfirmationOpen(true);
    return ConfirmationDialogBox({
      isOpen: confirmationOpen,
      title: 'Delete Confirmation Modal',
      message: <span>Are you sure you want to delete this URL</span>,
      trigger: 'DELETE',
      onCancel: handleCloseConfirmation,
      onConfirm: handleCloseConfirmation,
    });
  };

  const openEditModal: MouseEventHandler<HTMLButtonElement> = () => {
    setModalOpen(true);

    Modal({
      isOpen: modalOpen,
      title: 'Edit URL',
      message: (
        <form
          onSubmit={handleEdit}
          className="flex flex-row items-center gap-5 mx-auto"
        >
          <InputField
            name="title"
            labelName="Title"
            type="text"
            icon="fluent:slide-text-title-edit-16-regular"
            error=""
            value=""
            placeholder="Enter the URL title"
            onChange={(e) => handleFormInputChange(e)}
          />

          <InputField
            name="expiresAt"
            labelName="Expiry Date"
            type="text"
            icon="fluent-mdl2:date-time"
            error=""
            value=""
            placeholder="Enter the Expiry Date"
            onChange={(e) => handleFormInputChange(e)}
          />
        </form>
      ),
      trigger: 'EDIT',
    });
  };

  const openDeleteModal: MouseEventHandler<HTMLButtonElement> = () => {
    setModalOpen(true);

    return Modal({
      isOpen: modalOpen,
      title: 'Edit URL',
      message: <span>The selected URL will be deleted from the table</span>,
      trigger: 'DELETE',
      onConfirm: handleDelete,
      onCancel: handleCloseModal,
    });
  };

  return {
    editFormData,
    handleEdit,
    handleDelete,
    openEditModal,
    openDeleteModal,
  };
}
