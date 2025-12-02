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
    <section className="flex flex-col items-center gap-2 border border-undraw-secondary-100 shadow-xl shadow-blue-950 rounded-2xl bg-white p-6 relative z-50 ">
      <button
        className="absolute -top-1 -right-1 bg-white p-2 text-red-700 border border-red-700 rounded-2xl cursor-pointer"
        aria-label="Close"
        onClick={closeModal}
      ></button>
      <div className="text-xl text-undraw-primary font-extrabold">{title}</div>
      <div className="text-xl text-undraw-primary-100 shadow-2xs">
        {message}
      </div>
      <div className="flex flex-row gap-4">
        <button
          className="text-xs font-bold text-white bg-red-950 border-0 rounded-2xl p-4"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="text-xs font-bold text-white bg-blue-950 border-0 rounded-2xl p-4"
          type="submit"
          onClick={onConfirm}
        >
          {trigger}
        </button>
      </div>
    </section>
  );
};

export default Modal;
