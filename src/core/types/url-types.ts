import { SortFields } from '@/features/urls/constants';
import { urlFormValidationSchema } from './../validation/url-validation';
import { MouseEventHandler } from 'react';
import * as z from 'zod';

export interface UrlTableTypes {
  id: string;
  title: string;
  shortCode: string;
  originalUrl: string;
  updatedAt: string | Date;
  createdAt: string | Date;
  expiresAt: string | Date;
  encryptedUrl:string;
}

export interface UrlTableIcons {
  icon: string;
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface UrlTableHeadProps {
  field?: SortFields;
  type?: string;
  children?: React.ReactElement | React.ReactNode;
}

export interface UrlTableCellProps {
  date?: string | Date;
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
  expiresAt: string | Date;
  originalUrl?: string;
}

export interface SearchTypes {
  id?: string;
  title?: string;
  shortCode?: string;
  originalUrl?: string;
}

export interface UrlFormProps {
  tableId?: string;
  closeModal: () => void;
}

export type UrlFormErrors = Partial<
  Record<keyof z.infer<typeof urlFormValidationSchema>, string>
>;
