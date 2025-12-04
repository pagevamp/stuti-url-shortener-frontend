import {
  filterFormValidationSchema,
  urlFormValidationSchema,
} from './../validation/url-validation';
import { sortFields } from '@/src/hooks/useUrls';
import { MouseEventHandler } from 'react';
import * as z from 'zod';

export interface UrlTableTypes {
  user_id: string;
  title: string;
  short_code: string;
  original_url: string;
  updated_at: Date;
  created_at: Date;
  expires_at: Date;
}

export interface UrlTableIcons {
  icon: string;
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface UrlTableHeadProps {
  field?: sortFields;
  type?: string;
  children?: React.ReactElement | React.ReactNode;
}

export interface TableHeadProps {
  className?: string;
  slot?: React.ReactNode;
  children?: React.ReactElement | React.ReactNode;
}

export interface TableCellProps {
  className?: string;
  children?: React.ReactElement | React.ReactNode;
}

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
