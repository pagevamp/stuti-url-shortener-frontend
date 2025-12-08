export const tableHeaders = [
  'Url ID',
  'Title',
  'Shortened URL',
  'Original URL',
];
export enum urlTasks {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

export enum urlStatus {
  NEW = 'new',
  OLD = 'old',
  EXPIRED = 'expired',
}

export enum urlOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum sortFields {
  UPDATED_AT = 'updatedAt',
  CREATED_AT = 'createdAt',
  EXPIRES_AT = 'expiresAt',
}

export enum filterDates {
  START_DATE = 'start_date',
  END_DATE = 'end_date',
}
