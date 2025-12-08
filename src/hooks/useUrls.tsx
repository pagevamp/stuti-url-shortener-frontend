'use client';
import React, { useState, ChangeEvent, useMemo, FormEvent } from 'react';
import {
  SearchTypes,
  UrlFormErrors,
  UrlFormTypes,
  UrlTableTypes,
} from '@core/types/url-types';
import { urlFormValidationSchema } from '@core/validation/url-validation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  filterDates,
  sortFields,
  urlOrder,
  urlTasks,
} from '@/features/urls/constants';
import { useUrlIntegration } from './useUrlIntegration';

export function useUrls() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const { handlePostUrls, handleEditUrls, handleDeleteUrls } =
    useUrlIntegration();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<urlTasks | null>(null);

  // to add form
  const [addFormData, setAddFormData] = useState<UrlFormTypes>({
    title: '',
    expiresAt: '',
    originalUrl: '',
  });

  const handleAddFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
  };

  // to edit and form
  const [editFormData, setEditFormData] = useState<UrlFormTypes>({
    title: '',
    expiresAt: '',
  });

  const [error, setError] = useState<UrlFormErrors>({});

  const handleEditFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --------------------------------------------------------------------------------

  //to handle modal and dialog box

  const openModal = (action: urlTasks) => {
    setCurrentAction(action);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const openConfirmation = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);

  // --------------------------------------------------------------------------------

  // handle submit add form events
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = addFormData;
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
    handlePostUrls(addFormData);
    setAddFormData({
      title: '',
      expiresAt: '' as unknown as Date,
      originalUrl: '',
    });
    setModalOpen(false);
  };

  // --------------------------------------------------------------------------------

  // handle submit edit form events in the modal
  const [tableId, setTableId] = useState('');
  function handleTableId(id: string) {
    setTableId(id);
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
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
    handleEditUrls(tableId, editFormData);
    setEditFormData({
      title: '',
      expiresAt: '' as unknown as Date,
    });
    closeModal();
  };

  // --------------------------------------------------------------------------------

  // handle confirm for delete actions from the modals
  const handleConfirm = () => {
    if (currentAction === urlTasks.DELETE) {
      handleDeleteUrls(tableId);
      closeConfirmation();
      closeModal();
    }
    return 0;
  };

  // --------------------------------------------------------------------------------

  // to conditionally render the action-based content and button on the modal
  const handleTrigger = () => {
    if (currentAction === urlTasks.ADD) {
      return 'Add URL';
    } else if (currentAction === urlTasks.EDIT) {
      return 'Edit URL';
    } else {
      return 'Delete URL';
    }
  };

  const handleTitle = () => {
    if (currentAction === urlTasks.ADD) {
      return 'Add URL';
    } else if (currentAction === urlTasks.EDIT) {
      return 'Edit URL';
    } else {
      return 'Delete URL';
    }
  };

  // --------------------------------------------------------------------------------

  // to conditionally render the action-based content on the confirmation dialog box
  const handleConfirmationTitle = () => {
    if (currentAction === urlTasks.ADD) {
      return 'Edit Confirmation';
    } else {
      return 'Delete Confirmation';
    }
  };

  const handleConfirmationMessage = () => {
    if (currentAction === urlTasks.ADD) {
      return 'Are you sure you want to edit this URL?';
    } else {
      return 'Are you sure you want to delete this URL?';
    }
  };

  // --------------------------------------------------------------------------------

  // to conditionally render the action-based content on the confirmation dialog box
  const handleSubmitAction = (e: FormEvent) => {
    if (currentAction === urlTasks.DELETE) {
      openConfirmation();
    } else if (currentAction === urlTasks.EDIT) {
      handleEditSubmit(e);
    } else if (currentAction === urlTasks.ADD) {
      handleAddSubmit(e);
    }
    return 0;
  };

  // --------------------------------------------------------------------------------

  // to handle setting the search parameters
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

  // --------------------------------------------------------------------------------

  // to handle setting the sorting parameters

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

  // --------------------------------------------------------------------------------

  // to handle pagination of the table

  function handlePagination(page: number) {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  // --------------------------------------------------------------------------------

  // to set which column/field  on the table to filter
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

  // --------------------------------------------------------------------------------

  // to handle input for filtering
  const [filterFormData, setFilterFormData] = useState({
    start_date: '',
    end_date: '',
  });

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

  // --------------------------------------------------------------------------------

  // to handle setting the filter parameters

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

  // --------------------------------------------------------------------------------

  // to render data on the table based on the url parameters
  function useFilterTable(
    query: string,
    filterType: filterDates,
    filterDate: Date,
    filterField: sortFields,
    sortColumn: sortFields,
    sortOrder: urlOrder,
    currentPage: number,
    urlData: UrlTableTypes[]
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
      const queriedData = urlData.filter(
        (data: SearchTypes) =>
          data.title?.toLowerCase().includes(lowerCaseQuery) ||
          data.shortCode?.toLowerCase().includes(lowerCaseQuery)
      );

      // to render the data after filtering the queried data

      if (
        filterAs === (filterDates.START_DATE as string) &&
        filterColumn &&
        filterValue
      ) {
        const filteredData = [...queriedData].filter((filtered) => {
          const filterInstance = new Date(filtered[filterColumn]);
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
          const filterInstance = new Date(filtered[filterColumn]);
          return filterInstance.getTime() <= new Date(filterValue).getTime();
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
          const filterInstance = new Date(filtered[filterColumn]);
          return (
            filterInstance?.getTime() <= new Date(filterValue).getTime() &&
            filterInstance?.getTime() >= new Date(filterValue).getTime()
          );
        });
        return filteredData.slice(start, start + itemsPerPage);
      }

      // to render the data after sorting the queried data

      if (order === urlOrder.ASC && field) {
        const sortedData = [...queriedData].sort((a, b) => {
          const x = new Date(a[field]);
          const y = new Date(b[field]);
          return x?.getTime() - y?.getTime();
        });
        return sortedData.slice(start, start + itemsPerPage);
      } else if (order === urlOrder.DESC && field) {
        const sortedData = [...queriedData].sort((a, b) => {
          const x = new Date(a[field]);
          const y = new Date(b[field]);
          return y?.getTime() - x?.getTime();
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
      urlData,
    ]);
    return manipulatedData;
  }

  return {
    modalOpen,
    confirmationOpen,
    addFormData,
    editFormData,
    currentAction,
    searchParams,
    pathname,
    error,
    setModalOpen,
    setError,
    openModal,
    closeModal,
    openConfirmation,
    closeConfirmation,
    handleAddFormInputChange,
    handleEditFormInputChange,
    handleAddSubmit,
    handleEditSubmit,
    handleTableId,
    handleSubmitAction,
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
    handleTrigger,
    handleTitle,
    handleConfirmationTitle,
    handleConfirmationMessage,
  };
}

//
