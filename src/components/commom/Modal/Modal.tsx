'use client';
import { ModalTypes } from '@/src/core/types/url-types';
import { useUrls } from '@/src/hooks/useUrls';

const Modal = ({
  title,
  message,
  trigger,
  isOpen,
  onConfirm,
  onCancel,
}: ModalTypes) => {
  const { closeModal } = useUrls();

  if (isOpen === false) {
    return null;
  }
  return (
    <section className="flex flex-row items-center gap-2 border border-undraw-secondary-100 shadow-xl shadow-blue-950 rounded-2xl bg-white px-auto py-12 relative z-50">
      <button
        className="absolute -top-5 -right-5 bg-white p-2 text-red-700 border border-red-700 rounded-2xl"
        aria-label="x"
        onClick={closeModal}
      ></button>
      <div>{title}</div>
      <div className="text-xl text-undraw-primary-100 shadow-2xs">
        {message}
      </div>

      <button
        className="text-2xl font-bold text-white bg-red-950 border-0 rounded-2xl px-auto py-4"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        className="text-2xl font-bold text-white bg-blue-950 border-0 rounded-2xl px-auto py-4"
        type="submit"
        onClick={onConfirm}
      >
        {trigger}
      </button>
    </section>
  );
};

export default Modal;
