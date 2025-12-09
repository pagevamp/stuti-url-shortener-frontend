export const tableHeaders = [
  'Url ID',
  'Title',
  'Shortened URL',
  'Original URL',
];
export enum UrlTasks {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

export enum UrlStatus {
  NEW = 'new',
  OLD = 'old',
  EXPIRED = 'expired',
}

export enum UrlOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortFields {
  UPDATED_AT = 'updatedAt',
  CREATED_AT = 'createdAt',
  EXPIRES_AT = 'expiresAt',
}

export enum FilterDates {
  START_DATE = 'start_date',
  END_DATE = 'end_date',
}
