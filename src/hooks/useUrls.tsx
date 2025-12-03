'use client';
import { dummyData } from '@/public/data/dummyData';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, useMemo } from 'react';
import { urlOrder } from '../app/(protected)/urls/page';

export enum urlTasks {
  'add',
  'edit',
  'delete',
}

export enum sortFields {
  'updated_at',
  'created_at',
  'expires_at',
}

export function useUrls() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    expiresAt: '',
  });
  const [currentAction, setCurrentAction] = useState<urlTasks | null>(null);

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

  const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    console.log('Confirmed action:', currentAction, editFormData);
    closeConfirmation();
    closeModal();
    setEditFormData({
      title: '',
      expiresAt: '',
    });
  };

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

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
    }, 2000);

    return () => {
      clearTimeout(addQuery);
    };
  }

  const [sortOrderAsc, setSortOrderAsc] = React.useState(true);

  function handleSortOrder(order: string, field: string) {
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

    push(`${pathname}?${params.toString()}`);
    setSortOrderAsc(!sortOrderAsc);
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
    const order: urlOrder = sortOrder;
    const field: sortFields = sortColumn;
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
        const sortedData = queriedData.sort(
          (a, b) =>
            a.field! - b.field! || a.field! - b.field! || a.field! - b.field!
        );
        return sortedData.slice(start, start + itemsPerPage);
      } else if (order === urlOrder.DESC && field) {
        const sortedData = queriedData.sort(
          (a, b) =>
            b.field! - a.field! || b.field! - a.field! || b.field! - a.field!
        );
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
    openModal,
    closeModal,
    openConfirmation,
    closeConfirmation,
    handleFormInputChange,
    handleConfirm,
    handleSearch,
    sortOrderAsc,
    setSortOrderAsc,
    handleSortOrder,
    handlePagination,
    useFilterTable,
  };
}
