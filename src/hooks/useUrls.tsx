'use client';
import { dummyData } from '@/public/data/dummyData';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState, ChangeEvent, useMemo } from 'react';
import { urlOrder } from '../app/(protected)/urls/page';

export enum urlTasks {
  'add',
  'edit',
  'delete',
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
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleSort(order: string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (order) {
      params.set('sort', order);
    } else {
      params.delete('sort');
    }
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

  function useFilterTable(query: string, sort: urlOrder, currentPage: number) {
    const itemsPerPage = 5;
    const lowerCaseQuery = query.toLowerCase();
    const filteredData = useMemo(() => {
      const queriedData = dummyData.filter(
        (data) =>
          data.original_url.toLowerCase().includes(lowerCaseQuery) ||
          data.title.toLowerCase().includes(lowerCaseQuery) ||
          data.user_id.toLowerCase().includes(lowerCaseQuery) ||
          data.short_code.toLowerCase().includes(lowerCaseQuery)
      );
      const start = (currentPage - 1) * itemsPerPage;

      // if (sort) {
      //   const sortedData = queriedData.sort();
      // }
      return queriedData.slice(start, start + itemsPerPage);
    }, [lowerCaseQuery, currentPage]);
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
    handleSort,
    handlePagination,
    useFilterTable,
  };
}
