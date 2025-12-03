import { sortFields } from '@/src/hooks/useUrls';
import { MouseEventHandler } from 'react';

export interface UrlTableTypes {
  field?: sortFields;
  user_id: string;
  title: string;
  short_code: string;
  original_url: string;
  updated_at: string;
  created_at: string;
  expires_at: string;
}

export interface UrlTableIcons {
  icon: string;
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface UrlTableHeader {
  title?: string;
  type?: string;
  className: string;
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
