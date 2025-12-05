'use client';
import React, { useState, ChangeEvent, useMemo } from 'react';
import { SearchTypes, UrlFormErrors } from '@core/types/url-types';
import { urlFormValidationSchema } from '@core/validation/url-validation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { dummyData } from '@public/data/dummyData';

export enum urlTasks {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

export enum urlOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum sortFields {
  UPDATED_AT = 'updated_at',
  CREATED_AT = 'created_at',
  EXPIRES_AT = 'expires_at',
}

export enum filterDates {
  START_DATE = 'start_date',
  END_DATE = 'end_date',
}

export function useUrls() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<urlTasks | null>(null);

  // to edit and add form
  const [editFormData, setEditFormData] = useState({
    title: '',
    expiresAt: '',
    originalURL: '',
  });

  const [error, setError] = useState<UrlFormErrors>({});

  const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // for filter input
  const [filterFormData, setFilterFormData] = useState({
    start_date: '',
    end_date: '',
  });

  // const [filterError, setFilterError] = useState<FilterFormErrors>({});
  const [filterCardOpen, setFilterCardOpen] = useState(false);

  const handleFilterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterFormData((prev) => ({ ...prev, [name]: value }));
    handleFilter(name as filterDates, value as unknown as Date);
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
      originalURL: '',
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
      originalURL: '',
    });
  };

  const handleConfirm = () => {
    closeConfirmation();
    closeModal();
    setEditFormData({
      title: '',
      expiresAt: '',
      originalURL: '',
    });
  };

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

  function handleFilter(filterType: filterDates, filterDate: Date) {
    const params = new URLSearchParams(searchParams);
    if (filterType) {
      params.set('filterType', filterType.toString());
    } else {
      params.delete('filterType');
    }

    if (filterDate) {
      params.set('filterDate', filterDate.toString());
    } else {
      params.delete('filterDate');
    }

    const addFilter = setTimeout(() => {
      push(`${pathname}?${params.toString()}`);
    }, 5000);
    return () => {
      clearTimeout(addFilter);
    };
  }

  function handleFilterFields(filterField: sortFields) {
    const params = new URLSearchParams(searchParams);

    if (filterField) {
      params.set('filterField', filterField.toString());
    } else {
      params.delete('filterField');
    }
    const addFilterField = setTimeout(() => {
      replace(`${pathname}?${params.toString()}`);
    }, 1500);
    return () => {
      clearTimeout(addFilterField);
    };
  }

  function useFilterTable(
    query: string,
    filterType: filterDates,
    filterDate: Date,
    filterField: sortFields,
    sortColumn: sortFields,
    sortOrder: urlOrder,
    currentPage: number
  ) {
    const itemsPerPage = 5;
    const lowerCaseQuery = query.toLowerCase();
    const order = sortOrder;
    const filterAs = filterType;
    const filterValue = filterDate;
    const filterColumn = filterField;
    const field = sortColumn;
    const manipulatedData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      const queriedData = dummyData.filter(
        (data: SearchTypes) =>
          data.original_url?.toLowerCase().includes(lowerCaseQuery) ||
          data.title?.toLowerCase().includes(lowerCaseQuery) ||
          data.user_id?.toLowerCase().includes(lowerCaseQuery) ||
          data.short_code?.toLowerCase().includes(lowerCaseQuery)
      );

      if (
        filterAs === (filterDates.START_DATE as string) &&
        filterColumn &&
        filterValue
      ) {
        const filteredData = [...queriedData].filter((filtered) => {
          const filterInstance = filtered[filterColumn];
          return filterInstance.getTime() >= new Date(filterValue).getTime();
        });
        return filteredData.slice(start, start + itemsPerPage);
      } else if (
        filterAs === (filterDates.END_DATE as string) &&
        filterColumn &&
        filterValue &&
        filterColumn
      ) {
        const filteredData = [...queriedData].filter((filtered) => {
          const filterInstance = filtered[filterColumn];
          return filterInstance?.getTime() <= new Date(filterValue).getTime();
        });
        return filteredData.slice(start, start + itemsPerPage);
      } else if (
        filterAs ===
          ((filterDates.END_DATE as string) &&
            (filterDates.START_DATE as string)) &&
        filterColumn &&
        filterValue &&
        filterColumn
      ) {
        const filteredData = [...queriedData].filter((filtered) => {
          const filterInstance = filtered[filterColumn];
          return (
            filterInstance?.getTime() <= new Date(filterValue).getTime() &&
            filterInstance.getTime() >= new Date(filterValue).getTime()
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
      filterAs,
      filterValue,
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
    filterFormData,
    handleFilter,
    handleFilterFields,
    handleFilterInputChange,
    openFilter,
    closeFilter,
    filterCardOpen,
    setFilterCardOpen,
  };
}
