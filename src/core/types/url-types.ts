import {
  filterFormValidationSchema,
  urlFormValidationSchema,
} from './../validation/url-validation';
import { MouseEventHandler } from 'react';
import * as z from 'zod';

export interface ModalTypes {
  title: string;
  message: React.ReactElement;
  trigger: string;
  isOpen: boolean;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
}

export interface ConfirmationTypes {
  title: string;
  message: React.ReactElement | React.ReactNode;
  trigger: string;
  isOpen?: boolean;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
}

export interface UrlFormTypes {
  title: string;
  expiry_date: Date;
}

export type UrlFormErrors = Partial<
  Record<keyof z.infer<typeof urlFormValidationSchema>, string>
>;

export interface FilterFormTypes {
  start_date: Date;
  end_date: Date;
}

export type FilterFormErrors = Partial<
  Record<keyof z.infer<typeof filterFormValidationSchema>, string>
>;
