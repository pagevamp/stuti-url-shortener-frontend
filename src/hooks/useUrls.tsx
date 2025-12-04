'use client';
import { dummyData } from '@/public/data/dummyData';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, useMemo } from 'react';
import { FilterFormErrors, UrlFormErrors } from '../core/types/url-types';
import {
  filterFormValidationSchema,
  urlFormValidationSchema,
} from '../core/validation/url-validation';

export enum urlTasks {
  add = 'add',
  edit = 'edit',
  delete = 'delete',
}

export enum urlOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum sortFields {
  updated_at = 'updated_at',
  created_at = 'created_at',
  expires_at = 'expires_at',
}

export enum filterDates {
  start_date = 'start_date',
  end_date = 'end_date',
}

export function useUrls() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<urlTasks | null>(null);

  // for edit and add form
  const [editFormData, setEditFormData] = useState({
    title: '',
    expiresAt: '',
  });

  const [error, setError] = useState<UrlFormErrors>({});

  const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // for filter form
  const [filterFormData, setFilterFormData] = useState({
    start_date: '',
    end_date: '',
  });

  const [filterError, setFilterError] = useState<FilterFormErrors>({});
  const [filterCardOpen, setFilterCardOpen] = useState(false);

  const handleFilterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterFormData((prev) => ({ ...prev, [name]: value }));
  };
  const openFilter = () => {
    setFilterCardOpen(true);
  };

  const closeFilter = () => {
    setFilterCardOpen(false);
  };

  const openModal = (action: urlTasks) => {
    setCurrentAction(action);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditFormData({
      title: '',
      expiresAt: '',
    });
  };
  const openConfirmation = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);

  // handle edit and add form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = editFormData;
    const result = urlFormValidationSchema.safeParse(formValues);

    if (!result.success) {
      const formattedErrors: UrlFormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof UrlFormErrors;
        formattedErrors[field] = issue.message;
      });
      setError(formattedErrors);
      return;
    }
    setError({});

    openConfirmation();
    setEditFormData({
      title: '',
      expiresAt: '',
    });
  };

  const handleConfirm = () => {
    closeConfirmation();
    closeModal();
    setEditFormData({
      title: '',
      expiresAt: '',
    });
  };

  // handle filter form submit

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = filterFormData;
    const result = filterFormValidationSchema.safeParse(formValues);

    if (!result.success) {
      const formattedErrors: FilterFormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FilterFormErrors;
        formattedErrors[field] = issue.message;
      });
      setFilterError(formattedErrors);
      return;
    }
    const name = result.data as keyof sortFields;
    const value = result.data.end_date || result.data.start_date;

    handleFilter(name, value);

    setFilterError({});
  };

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    const addQuery = setTimeout(() => {
      replace(`${pathname}?${params.toString()}`);
    }, 1500);

    return () => {
      clearTimeout(addQuery);
    };
  }

  const [sortOrderAsc, setSortOrderAsc] = React.useState(true);

  async function handleSortOrder(order: urlOrder, field: sortFields) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (order) {
      params.set('sortOrder', order.toString());
    } else {
      params.delete('sortOrder');
    }

    if (field) {
      params.set('sortColumn', field.toString());
    } else {
      params.delete('sortColumn');
    }
    setSortOrderAsc(!sortOrderAsc);

    replace(`${pathname}?${params.toString()}`);
  }

  function handlePagination(page: number) {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleFilter(
    filterField: sortFields,
    filterFrom?: filterDates.start_date,
    filterTo?: filterDates.end_date
  ) {
    const params = new URLSearchParams(searchParams);
    if (filterFrom) {
      params.set('filterFrom', filterFrom.toString());
    } else {
      params.delete('filterFrom');
    }

    if (filterTo) {
      params.set('filterTo', filterTo.toString());
    } else {
      params.delete('filterTo');
    }

    if (filterField) {
      params.set('filterField', filterField.toString());
    } else {
      params.delete('filterField');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function useFilterTable(
    query: string,
    filterFrom: filterDates.start_date,
    filterTo: filterDates.end_date,
    filterField: sortFields,
    sortColumn: sortFields,
    sortOrder: urlOrder,
    currentPage: number
  ) {
    const itemsPerPage = 5;
    const lowerCaseQuery = query.toLowerCase();
    const order = sortOrder;
    const filterStart = filterFrom;
    const filterEnd = filterTo;
    const filterColumn = filterField;
    const field = sortColumn;
    const manipulatedData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      const queriedData = dummyData.filter(
        (data) =>
          data.original_url?.toLowerCase().includes(lowerCaseQuery) ||
          data.title?.toLowerCase().includes(lowerCaseQuery) ||
          data.user_id?.toLowerCase().includes(lowerCaseQuery) ||
          data.short_code?.toLowerCase().includes(lowerCaseQuery)
      );

      if (filterFrom && filterColumn) {
        const filteredData = [...queriedData].filter((filtered) => {
          const filterInstance = filtered[filterColumn];
          return (
            filterInstance?.toDateString().includes(filterFrom) &&
            filterInstance?.toDateString() > filterFrom
          );
        });
        return filteredData.slice(start, start + itemsPerPage);
      } else if (filterTo && filterColumn) {
        const filteredData = [...queriedData].filter((filtered) => {
          const filterInstance = filtered[filterColumn];
          return (
            filterInstance?.toDateString().includes(filterTo) &&
            filterInstance?.toDateString() < filterTo
          );
        });
        return filteredData.slice(start, start + itemsPerPage);
      }

      if (order === urlOrder.ASC && field) {
        const sortedData = [...queriedData].sort((a, b) => {
          const x = a[field];
          const y = b[field];
          if (x instanceof Date) return x.getTime() - y.getTime();
          return 0;
        });
        return sortedData.slice(start, start + itemsPerPage);
      } else if (order === urlOrder.DESC && field) {
        const sortedData = [...queriedData].sort((a, b) => {
          const x = a[field];
          const y = b[field];
          if (x instanceof Date) return y.getTime() - x.getTime();
          return 0;
        });
        return sortedData.slice(start, start + itemsPerPage);
      }
      return queriedData.slice(start, start + itemsPerPage);
    }, [
      lowerCaseQuery,
      currentPage,
      order,
      field,
      filterFrom,
      filterTo,
      filterColumn,
    ]);
    return manipulatedData;
  }

  return {
    modalOpen,
    confirmationOpen,
    editFormData,
    currentAction,
    searchParams,
    pathname,
    error,
    setError,
    openModal,
    closeModal,
    openConfirmation,
    closeConfirmation,
    handleFormInputChange,
    handleSubmit,
    handleConfirm,
    handleSearch,
    sortOrderAsc,
    setSortOrderAsc,
    handleSortOrder,
    handlePagination,
    useFilterTable,
    filterError,
    filterFormData,
    handleFilter,
    handleFilterSubmit,
    handleFilterInputChange,
    openFilter,
    closeFilter,
    filterCardOpen,
    setFilterCardOpen,
  };
}
