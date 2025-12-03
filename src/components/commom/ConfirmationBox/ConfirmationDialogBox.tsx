'use client';
import { ConfirmationTypes } from '@/src/core/types/url-types';
import { useUrls } from '@/src/hooks/useUrls';

export const ConfirmationDialogBox = ({
  title,
  message,
  trigger,
  isOpen,
  onCancel,
  onConfirm,
}: ConfirmationTypes) => {
  if (isOpen === false) {
    return null;
  }

  return (
    <article className="absolute top-[35%] left-[35%] mx-auto">
      <section className="flex flex-col items-center gap-2 border border-undraw-secondary-100 shadow-xl shadow-blue-950 rounded-2xl bg-white px-10 py-12 relative z-100 w-fit">
        <button
          className="absolute -top-1 -right-1 py-1 px-2 bg-white text-red-700 border border-red-700 rounded-full cursor-pointer text-xs shadow-2xl"
          aria-label="Close"
          onClick={onCancel}
        >
          x
        </button>
        <div>{title}</div>
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
    </article>
  );
};
