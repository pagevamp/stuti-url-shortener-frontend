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
  FilterDates,
  SortFields,
  UrlOrder,
  UrlTasks,
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
  const [currentAction, setCurrentAction] = useState<UrlTasks | null>(null);

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

  const openModal = (action: UrlTasks) => {
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

  const handleEditSubmit = async (e: FormEvent, tableId: string) => {
    e.preventDefault();

    const editFormValues = editFormData;
    const result = urlFormValidationSchema.safeParse(editFormValues);
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
    closeModal();
  };

  // --------------------------------------------------------------------------------

  // handle confirm for delete actions from the modals
  const handleConfirm = () => {
    if (currentAction === UrlTasks.DELETE) {
      handleDeleteUrls(tableId);
      closeConfirmation();
      closeModal();
    } else if (currentAction === UrlTasks.EDIT) {
      handleEditUrls(tableId, editFormData);
      closeConfirmation();
      closeModal();
      setEditFormData({
        title: '',
        expiresAt: '' as unknown as Date,
      });
    }
  };

  // --------------------------------------------------------------------------------

  // to conditionally render the action-based content and button on the modal
  const handleTrigger = () => {
    if (currentAction === UrlTasks.ADD) {
      return 'Add URL';
    } else if (currentAction === UrlTasks.EDIT) {
      return 'Edit URL';
    } else {
      return 'Delete URL';
    }
  };

  const handleTitle = () => {
    if (currentAction === UrlTasks.ADD) {
      return 'Add URL';
    } else if (currentAction === UrlTasks.EDIT) {
      return 'Edit URL';
    } else {
      return 'Delete URL';
    }
  };

  // --------------------------------------------------------------------------------

  // to conditionally render the action-based content on the confirmation dialog box
  const handleConfirmationTitle = () => {
    if (currentAction === UrlTasks.EDIT) return 'Edit Confirmation';
    if (currentAction === UrlTasks.DELETE) return 'Delete Confirmation';
    return '';
  };

  const handleConfirmationMessage = () => {
    if (currentAction === UrlTasks.EDIT)
      return 'Are you sure you want to edit this URL?';
    if (currentAction === UrlTasks.DELETE)
      return 'Are you sure you want to delete this URL?';
    return '';
  };

  // --------------------------------------------------------------------------------

  // to conditionally render the action-based content on the confirmation dialog box
  const handleSubmitAction = () => {
    if (currentAction === UrlTasks.DELETE) {
      openConfirmation();
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

  async function handleSortOrder(order: UrlOrder, field: SortFields) {
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

  // to set toggle/open the filter bar

  const [filterOpen, setFilterOpen] = useState<boolean>(true);

  // --------------------------------------------------------------------------------

  // to set which column/field  on the table to filter
  function handleFilterFields(filterField: SortFields) {
    const params = new URLSearchParams(searchParams);

    if (filterField) {
      params.set('filterField', filterField.toString());
    } else {
      params.delete('filterField');
    }
    const addFilterField = setTimeout(() => {
      replace(`${pathname}?${params.toString()}`);
    }, 300);
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
    handleFilter(name as FilterDates, value as unknown as Date);
  };

  // --------------------------------------------------------------------------------

  // to handle setting the filter parameters

  function handleFilter(filterType: FilterDates, filterDate: Date) {
    const params = new URLSearchParams(searchParams);
    if (filterType === FilterDates.START_DATE) {
      params.set('start_date', filterDate.toString());
    }

    if (filterType === FilterDates.END_DATE) {
      params.set('end_date', filterDate.toString());
    }

    const addFilter = setTimeout(() => {
      push(`${pathname}?${params.toString()}`);
    }, 1000);
    return () => {
      clearTimeout(addFilter);
    };
  }

  // --------------------------------------------------------------------------------

  // to handle setting the filter parameters

  function handleClearFilter() {
    const date = new Date(0);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    params.set('start_date', date.toString());

    params.delete('end_date');

    params.delete('filterField');

    replace(`${pathname}?${params.toString()}`);
  }

  // --------------------------------------------------------------------------------

  // to render data on the table based on the url parameters
  function useFilterTable(
    query: string,
    start_date: FilterDates.START_DATE,
    end_date: FilterDates.END_DATE,
    filterField: SortFields,
    sortColumn: SortFields,
    sortOrder: UrlOrder,
    currentPage: number,
    urlData: UrlTableTypes[]
  ) {
    const itemsPerPage = 5;
    const lowerCaseQuery = query.toLowerCase();
    const order = sortOrder;
    const filterColumn = filterField;
    const field = sortColumn;
    const manipulatedData = useMemo(() => {
      const start = (currentPage - 1) * itemsPerPage;
      const queriedData = urlData.filter(
        (data: SearchTypes) =>
          data.title?.toLowerCase().includes(lowerCaseQuery) ||
          data.shortCode?.toLowerCase().includes(lowerCaseQuery)
      );

      // to render the data after sorting the queried data

      if (order === UrlOrder.ASC && field) {
        const sortedData = [...queriedData].sort((a, b) => {
          const x = new Date(a[field]);
          const y = new Date(b[field]);
          return x?.getTime() - y?.getTime();
        });
        return sortedData.slice(start, start + itemsPerPage);
      }

      if (order === UrlOrder.DESC && field) {
        const sortedData = [...queriedData].sort((a, b) => {
          const x = new Date(a[field]);
          const y = new Date(b[field]);
          return y?.getTime() - x?.getTime();
        });
        return sortedData.slice(start, start + itemsPerPage);
      }

      // // to render the data after filtering the queried data
      // // to filter with starting date
      // if (start_date && filterColumn) {
      //   const filteredData = [...queriedData].filter((filtered) => {
      //     const filterInstance = new Date(filtered[filterColumn]);
      //     return filterInstance.getTime() >= new Date(start_date).getTime();
      //   });
      //   return filteredData.slice(start, start + itemsPerPage);
      // }
      // // to filter to end date
      // if (end_date && filterColumn) {
      //   const filteredData = [...queriedData].filter((filtered) => {
      //     const filterInstance = new Date(filtered[filterColumn]);
      //     return filterInstance.getTime() <= new Date(end_date).getTime();
      //   });
      //   return filteredData.slice(start, start + itemsPerPage);
      // }

      return queriedData.slice(start, start + itemsPerPage);
    }, [currentPage, urlData, order, field, lowerCaseQuery]);
    return manipulatedData;
  }

  // // to render data on the table based on the url parameters
  // function useFinalTable(
  //   query: string,
  //   start_date: FilterDates.START_DATE,
  //   end_date: FilterDates.END_DATE,
  //   filterField: SortFields,
  //   sortColumn: SortFields,
  //   sortOrder: UrlOrder,
  //   currentPage: number,
  //   urlData: UrlTableTypes[]
  // ) {
  //   const itemsPerPage = 5;
  //   const lowerCaseQuery = query.toLowerCase();
  //   const order = sortOrder;
  //   const filterColumn = filterField;
  //   const field = sortColumn;
  //   const manipulatedFinalData = useMemo(() => {
  //     const start = (currentPage - 1) * itemsPerPage;
  //     const finalData = useFilterTable(
  //       query,
  //       start_date,
  //       end_date,
  //       filterField,
  //       sortColumn,
  //       sortOrder,
  //       currentPage,
  //       urlData
  //     );

  //     // to render the data after filtering the queried data
  //     // to filter with starting date
  //     if (start_date && filterColumn) {
  //       const filteredData = [...finalData].filter((filtered) => {
  //         const filterInstance = new Date(filtered[filterColumn]);
  //         return filterInstance.getTime() >= new Date(start_date).getTime();
  //       });
  //       return filteredData.slice(start, start + itemsPerPage);
  //     }
  //     // to filter to end date
  //     if (end_date && filterColumn) {
  //       const filteredData = [...finalData].filter((filtered) => {
  //         const filterInstance = new Date(filtered[filterColumn]);
  //         return filterInstance.getTime() <= new Date(end_date).getTime();
  //       });
  //       return filteredData.slice(start, start + itemsPerPage);
  //     }

  //     return finalData.slice(start, start + itemsPerPage);
  //   }, [
  //     currentPage,
  //     query,
  //     start_date,
  //     end_date,
  //     filterField,
  //     sortColumn,
  //     sortOrder,
  //     urlData,
  //     filterColumn,
  //   ]);

  //   return manipulatedFinalData;
  // }

  return {
    tableId,
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
    filterOpen,
    setFilterOpen,
    filterCardOpen,
    setFilterCardOpen,
    handleTrigger,
    handleTitle,
    handleConfirmationTitle,
    handleConfirmationMessage,
    handleClearFilter,
  };
}
