'use client';
import { ConfirmationTypes } from '@/src/core/types/url-types';
import React, { useState } from 'react';

export const ConfirmationDialogBox = ({
  title,
  message,
  trigger,
  isOpen,
  onCancel,
  onConfirm,
}: ConfirmationTypes) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  if (isOpen === false) {
    return null;
  }

  return (
    <section className="flex flex-row items-center gap-2 border border-undraw-secondary-100 shadow-xl shadow-blue-950 rounded-2xl bg-white px-auto py-12 relative">
      <button
        className="absolute -top-5 -right-5 bg-white p-2 text-red-700 border border-red-700 rounded-2xl"
        aria-label="x"
        onClick={handleClose}
      ></button>
      <div>{title}</div>
      <div className="text-xl text-undraw-primary-100 shadow-2xs">
        {message}
      </div>

      <button
        className="text-2xl font-bold text-white bg-red-950 border-0 rounded-2xl px-auto py-4"
        onClick={onCancel}
      >
        CANCEL
      </button>
      <button
        onClick={onConfirm}
        className="text-2xl font-bold text-white bg-blue-950 border-0 rounded-2xl px-auto py-4"
      >
        {trigger}
      </button>
    </section>
  );
};
