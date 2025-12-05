'use client';
import { ConfirmationTypes } from '@core/types/url-types';
import { Button } from '@components/common/Button';

export const ConfirmationDialogBox = ({
  title,
  message,
  trigger,
  isOpen,
  onCancel,
  onConfirm,
}: ConfirmationTypes) => {
  if (!isOpen) {
    return null;
  }

  return (
    <article className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
      <section className="flex flex-col items-center gap-2 border border-undraw-secondary-100 shadow-xl shadow-blue-950 rounded-2xl bg-white px-10 py-12 relative z-100 w-fit">
        <Button
          size="icon"
          variant="icon"
          className="absolute -top-1 -right-1 py-1 px-2 bg-white text-red-700 border border-red-700 rounded-full cursor-pointer text-xs shadow-2xl"
          aria-label="Close"
          onClick={onCancel}
        >
          x
        </Button>
        <div>{title}</div>
        <div className="text-xl text-undraw-primary-100 shadow-2xs">
          {message}
        </div>

        <div className="flex flex-row gap-4">
          <Button
            className="text-xs font-bold text-white bg-red-950 border-0 rounded-2xl p-4 w-fit"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="text-xs font-bold text-white bg-blue-950 border-0 rounded-2xl p-4 w-fit"
            type="submit"
            onClick={onConfirm}
          >
            {trigger}
          </Button>
        </div>
      </section>
    </article>
  );
};
