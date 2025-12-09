'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Icon } from '@iconify/react';
import { useUrls } from '@hooks/useUrls';
import { ConfirmationDialogBox } from '@components/common/ConfirmationBox/ConfirmationDialogBox';
import { Button } from '@components/common/Button/Button';
import { Suspense } from 'react';
import { SearchComponent } from '@components/common/SearchComponent/SearchComponent';
import { UrlTableHead } from '@components/common/UrlTableHead/UrlTableHead';
import { Pagination } from '@components/common/PaginationComponent/Pagination';
import { UrlTableTypes } from '@/core/types/url-types';
import { EditUrlForm } from '@/components/common/EditUrlForm';
import { AddUrlForm } from '@/components/common/AddUrlForm';
import { Modal } from '@/components/common/Modal';
import { useUrlIntegration } from '@/hooks/useUrlIntegration';
import {
  FilterDates,
  SortFields,
  tableHeaders,
  UrlOrder,
  UrlTasks,
} from './constants';

export const UrlsComponent = ({
  query,
  // filterDate,
  filterField,
  // filterTypes,
  sortOrder,
  sortColumn,
  currentPage,
  start_date,
  end_date,
}: {
  query: string;
  filterDate: Date;
  // filterTypes: FilterDates;
  filterField: SortFields;
  sortOrder: UrlOrder;
  sortColumn: SortFields;
  currentPage: number;
  start_date: FilterDates.START_DATE;
  end_date: FilterDates.END_DATE;
}) => {
  const {
    modalOpen,
    tableId,
    confirmationOpen,
    currentAction,
    openModal,
    closeModal,
    closeConfirmation,
    handleSubmitAction,
    handleTableId,
    handleConfirm,
    useFilterTable,
    handleTrigger,
    handleTitle,
    handleConfirmationTitle,
    handleConfirmationMessage,
    handleClearFilter,
  } = useUrls();

  const { useGetUrls } = useUrlIntegration();
  const urlData = useGetUrls();

  const itemsPerPage = 5;
  const data = useFilterTable(
    query,
    start_date,
    end_date,
    filterField,
    sortColumn,
    sortOrder,
    currentPage,
    urlData
  );

  const actions = [
    {
      icon: 'mdi:pencil',
      title: 'edit',
      onClick: () => openModal(UrlTasks.EDIT),
    },
    {
      icon: 'gg:trash',
      title: 'delete',
      onClick: () => openModal(UrlTasks.DELETE),
    },
  ];
  const add = {
    onClick: () => openModal(UrlTasks.ADD),
  };

  return (
    <div className="my-20 mx-6 p-4 bg-undraw-primary-100 border-3 border-undraw-secondary-100 shadow-2xl shadow-gray-800 w-fit">
      <section className="flex flex-row items-center place-content-stretch mx-10 my-5 w-full relative">
        <SearchComponent />

        <div className="absolute right-20 flex flex-row items-center gap-2">
          <Button variant="handler" onClick={handleClearFilter}>
            Clear Filters
            <Icon icon="mage:filter-fill" height={22} width={22} />
          </Button>
          <Button variant="handler" onClick={add.onClick}>
            Shorten New Url{' '}
            <Icon
              icon="icon-park-outline:clothes-pants-short"
              height={22}
              width={22}
            />
          </Button>
        </div>
      </section>

      <Suspense key={query + currentPage}>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-t border-[#E6EFF5]">
              {tableHeaders.map((headers) => (
                <TableHead
                  key={headers}
                  className="text-center text-[#0B0704] font-primary text-[16px] py-3 border-r w-[350px]"
                >
                  {headers}
                </TableHead>
              ))}
              <UrlTableHead type="sorted" field={SortFields.CREATED_AT}>
                Created At
              </UrlTableHead>
              <UrlTableHead type="sorted" field={SortFields.UPDATED_AT}>
                Updated At
              </UrlTableHead>
              <UrlTableHead type="sorted" field={SortFields.EXPIRES_AT}>
                Expires At
              </UrlTableHead>
              <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-3 border-r w-[350px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((data: UrlTableTypes) => (
              <TableRow key={data.id} onClick={() => handleTableId(data.id)}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>
                  <a
                    href={data.originalUrl}
                    className="text-decoration:none flex flex-row "
                  >
                    <span></span>
                    {data.shortCode}
                    <Icon icon="line-md:link" className="text-emerald-900" />
                  </a>
                </TableCell>
                <TableCell>{data.originalUrl}</TableCell>
                <TableCell>
                  {data?.createdAt ? new Date(data.createdAt).toString() : '-'}
                </TableCell>
                <TableCell>
                  {data?.updatedAt ? new Date(data.updatedAt).toString() : '-'}
                </TableCell>
                <TableCell>
                  {data?.expiresAt ? new Date(data.expiresAt).toString() : '-'}
                </TableCell>
                <TableCell className="flex flex-row gap-5">
                  {actions.map((action, idx) => (
                    <Button
                      variant="icon"
                      size="icon"
                      key={idx}
                      onClick={action.onClick}
                    >
                      <Icon icon={action.icon} className="text-emerald-900" />
                    </Button>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableCaption>
            <section className="flex flex-col gap-2">
              <Pagination
                totalPages={Math.ceil(urlData.length / itemsPerPage)}
              />
              <span>
                Your URLS shortened by{' '}
                <span className="text-emerald-900 font-extrabold">.SUS</span>
              </span>
            </section>
          </TableCaption>
        </Table>
      </Suspense>

      {/* {modalOpen && ( */}
      <Modal
        isOpen={modalOpen}
        trigger={handleTrigger()}
        title={handleTitle()}
        message={
          currentAction === UrlTasks.EDIT ? (
            <EditUrlForm tableId={tableId} closeModal={closeModal} />
          ) : currentAction === UrlTasks.ADD ? (
            <AddUrlForm closeModal={closeModal} />
          ) : (
            <span>Deleting the Url...</span>
          )
        }
        onCancel={closeModal}
        onConfirm={handleSubmitAction}
      />

      {currentAction === UrlTasks.DELETE && (
        <ConfirmationDialogBox
          isOpen={confirmationOpen}
          trigger={handleTrigger()}
          title={handleConfirmationTitle()}
          message={handleConfirmationMessage()}
          onCancel={closeConfirmation}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};
