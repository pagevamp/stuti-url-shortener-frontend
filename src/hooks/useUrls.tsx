'use client';
import { useState, ChangeEvent } from 'react';
import { getAccessToken } from '../lib/actions';

export function useUrls() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    expiresAt: '',
  });
  const [currentAction, setCurrentAction] = useState<
    'add' | 'edit' | 'delete' | null
  >(null);

  const openModal = (action: 'add' | 'edit' | 'delete') => {
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
    setEditFormData({
      title: '',
      expiresAt: '',
    });
  };

  function handleSearch(term: string) {
    console.log(term);
  }
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
    handleSearch,
  };
}
