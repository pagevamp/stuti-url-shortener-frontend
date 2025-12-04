'use client';
import { dummyData } from '@/public/data/dummyData';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, useMemo } from 'react';
import { UrlFormErrors } from '../core/types/url-types';
import { urlFormValidationSchema } from '../core/validation/url-validation';

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

export function useUrls() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<urlTasks | null>(null);

  const [editFormData, setEditFormData] = useState({
    title: '',
    expiresAt: '',
  });

  const [error, setError] = useState<UrlFormErrors>({});

  const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
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

    await replace(`${pathname}?${params.toString()}`);
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

  function useFilterTable(
    query: string,
    sortColumn: sortFields,
    sortOrder: urlOrder,
    currentPage: number
  ) {
    const itemsPerPage = 5;
    const lowerCaseQuery = query.toLowerCase();
    const order = sortOrder;
    const field = sortColumn;
    const filteredData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      const queriedData = dummyData.filter(
        (data) =>
          data.original_url?.toLowerCase().includes(lowerCaseQuery) ||
          data.title?.toLowerCase().includes(lowerCaseQuery) ||
          data.user_id?.toLowerCase().includes(lowerCaseQuery) ||
          data.short_code?.toLowerCase().includes(lowerCaseQuery)
      );

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
    }, [lowerCaseQuery, currentPage, order, field]);
    return filteredData;
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
  };
}
