export const tableHeaders = [
  {
    header: 'Url ID',
    className:
      'text-center text-[#0B0704] font-primary text-[16px] py-3 border-r hidden lg:table-cell',
  },
  {
    header: 'Title',
    className:
      'text-center text-[#0B0704] font-primary text-[16px] py-3 border-r',
  },
  {
    header: 'Shortened URL',
    className:
      'text-center text-[#0B0704] font-primary text-[16px] py-3 border-r',
  },
  {
    header: 'Original URL',
    className:
      'text-center text-[#0B0704] font-primary text-[16px] py-3 border-r hidden lg:table-cell',
  },
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
