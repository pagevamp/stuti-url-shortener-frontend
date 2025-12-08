'use client';
import { ModalTypes } from '@/core/types/url-types';
import { Button } from '../Button';

export const Modal = ({
  title,
  message,
  trigger,
  isOpen,
  onConfirm,
  onCancel,
}: ModalTypes) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="w-screen h-screen absolute top-15 z-10" data-modal={isOpen}>
      <article className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
        <section className="flex flex-col items-center gap-3 border border-undraw-secondary-100 shadow-xl shadow-blue-950 rounded-2xl bg-white px-12 py-4 relative z-50 w-fit">
          <Button
            variant="icon"
            size="icon"
            className="absolute -top-1 -right-1 py-1 px-2 bg-white text-red-700 border border-red-700 rounded-full cursor-pointer text-xs shadow-2xl"
            aria-label="Close"
            onClick={onCancel}
          >
            x
          </Button>
          <div className="text-xl text-undraw-primary font-extrabold">
            {title}
          </div>
          <div className="text-xl text-undraw-primary-100 shadow-2xs">
            {message}
          </div>

          <div className="flex flex-row gap-4 mt-4">
            <Button
              className="text-md font-bold text-white bg-red-950 border-0 rounded-2xl p-2"
              onClick={onCancel}
            >
              Cancel
            </Button>
            {trigger === 'Delete URL' && (
              <Button
                className="text-md font-bold text-white bg-blue-950 border-0 rounded-2xl p-2"
                type="submit"
                onClick={onConfirm}
              >
                {trigger}
              </Button>
            )}
          </div>
        </section>
      </article>
    </div>
  );
};
