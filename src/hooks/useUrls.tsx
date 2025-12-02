'use client';
import { useState, ChangeEvent } from 'react';

export function useUrls() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    expiresAt: '',
  });
  const [currentAction, setCurrentAction] = useState<'edit' | 'delete' | null>(
    null
  );

  const openModal = (action: 'edit' | 'delete') => {
    setCurrentAction(action);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  const openConfirmation = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);

  const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    console.log('Confirmed action:', currentAction, editFormData);
    closeConfirmation();
    closeModal();
  };

  return {
    modalOpen,
    confirmationOpen,
    editFormData,
    currentAction,
    openModal,
    closeModal,
    openConfirmation,
    closeConfirmation,
    handleFormInputChange,
    handleConfirm,
  };
}
