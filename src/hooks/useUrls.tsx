'use client';
import { UrlFormErrors } from '@/core/types/url-types';
import { urlFormValidationSchema } from '@/core/validation/url-validation';
import React, { useState, ChangeEvent } from 'react';

export enum urlTasks {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

export function useUrls() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<urlTasks | null>(null);

  // to edit and add form
  const [editFormData, setEditFormData] = useState({
    title: '',
    expiresAt: '',
    originalURL: '',
  });

  const [error, setError] = useState<UrlFormErrors>({});

  const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (action: urlTasks) => {
    setCurrentAction(action);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditFormData({
      title: '',
      expiresAt: '',
      originalURL: '',
    });
  };
  const openConfirmation = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);

  // handle edit and add form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = editFormData;
    const result = urlFormValidationSchema.safeParse(formValues);

    if (!result.success) {
      const formattedErrors: UrlFormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof UrlFormErrors;
        formattedErrors[field] = issue.message;
      });
      setError(formattedErrors);
      return;
    }
    setError({});

    openConfirmation();
    setEditFormData({
      title: '',
      expiresAt: '',
      originalURL: '',
    });
  };

  const handleConfirm = () => {
    closeConfirmation();
    closeModal();
    setEditFormData({
      title: '',
      expiresAt: '',
      originalURL: '',
    });
  };

  return {
    modalOpen,
    confirmationOpen,
    editFormData,
    currentAction,
    error,
    setError,
    openModal,
    closeModal,
    openConfirmation,
    closeConfirmation,
    handleFormInputChange,
    handleSubmit,
    handleConfirm,
  };
}
