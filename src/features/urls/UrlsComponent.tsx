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
import {
  filterDates,
  sortFields,
  urlOrder,
  urlTasks,
  useUrls,
} from '@hooks/useUrls';
import { InputField } from '@/components/common/InputField/InputField';
import { ConfirmationDialogBox } from '@components/common/ConfirmationBox/ConfirmationDialogBox';
import { Button } from '@components/common/Button/Button';
import { Suspense } from 'react';
import { SearchComponent } from '@components/common/SearchComponent/SearchComponent';
import { UrlTableHead } from '@components/common/UrlTableHead/UrlTableHead';
import { Pagination } from '@components/common/PaginationComponent/Pagination';
import { dummyData } from '@public/data/dummyData';
import { Modal } from '@/components/common/Modal';

export const UrlsComponent = ({
  query,
  filterType,
  filterDate,
  filterField,
  sortOrder,
  sortColumn,
  currentPage,
}: {
  query: string;
  filterType: filterDates;
  filterDate: Date;
  filterField: sortFields;
  sortOrder: urlOrder;
  sortColumn: sortFields;
  currentPage: number;
}) => {
  const {
    modalOpen,
    confirmationOpen,
    editFormData,
    currentAction,
    error,
    openModal,
    closeModal,
    openConfirmation,
    closeConfirmation,
    handleFormInputChange,
    handleSubmit,
    handleConfirm,
    useFilterTable,
  } = useUrls();

  const tableHeaders = ['User ID', 'Title', 'Shortened URL', 'Original URL'];
  const actions = [
    {
      icon: 'mdi:pencil',
      title: 'edit',
      onClick: () => openModal(urlTasks.EDIT),
    },
    {
      icon: 'gg:trash',
      title: 'delete',
      onClick: () => openModal(urlTasks.DELETE),
    },
  ];
  const add = {
    onClick: () => openModal(urlTasks.ADD),
  };

  const itemsPerPage = 5;
  const data = useFilterTable(
    query,
    filterType,
    filterDate,
    filterField,
    sortColumn,
    sortOrder,
    currentPage
  );

  return (
    <div className="my-20 mx-8 p-5 bg-gray-200 w-fit">
      <section className="flex flex-row items-center place-content-stretch mx-10 my-5 w-full relative">
        <SearchComponent />

        <Button
          className="flex flex-row gap-3 h-12 text-white font-semibold px-2 place-self-end absolute right-20"
          onClick={add.onClick}
        >
          Shorten New Url{' '}
          <Icon
            icon="icon-park-outline:clothes-pants-short"
            height={22}
            width={22}
          />
        </Button>
      </section>

      <Suspense
        key={
          query +
          sortColumn +
          sortOrder +
          filterType +
          filterDate +
          filterField +
          currentPage
        }
      >
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
              <UrlTableHead type="sorted" field={sortFields.CREATED_AT}>
                Created At
              </UrlTableHead>
              <UrlTableHead type="sorted" field={sortFields.UPDATED_AT}>
                Updated At
              </UrlTableHead>
              <UrlTableHead type="sorted" field={sortFields.EXPIRES_AT}>
                Expires At
              </UrlTableHead>
              <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-3 border-r w-[350px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((data, index: number) => (
              <TableRow key={index}>
                <TableCell>{data.user_id}</TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.short_code}</TableCell>
                <TableCell>
                  <a
                    href={data.original_url}
                    className="text-decoration:none flex flex-row "
                  >
                    <span></span>
                    {data.original_url}
                    <Icon icon="line-md:link" className="text-emerald-900" />
                  </a>
                </TableCell>
                <TableCell> {data.created_at.toString()}</TableCell>
                <TableCell>{data.updated_at.toString()}</TableCell>
                <TableCell>{data.expires_at.toString()}</TableCell>
                <TableCell className="flex flex-row gap-5">
                  {actions.map((action, idx) => (
                    <button key={idx} onClick={action.onClick}>
                      <Icon
                        icon={action.icon}
                        height={22}
                        width={22}
                        className="text-emerald-900"
                      />
                    </button>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>
            <section className="flex flex-col gap-2 ">
              <Pagination totalPages={dummyData.length / itemsPerPage} />
              <span>
                Your URLS shortened by{' '}
                <span className="text-emerald-900 font-extrabold">.SUS</span>
              </span>
            </section>
          </TableCaption>
        </Table>
      </Suspense>

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          trigger={
            currentAction === urlTasks.ADD
              ? 'Add URL'
              : currentAction === urlTasks.EDIT
              ? 'Edit URL'
              : 'Delete URL'
          }
          title={
            currentAction === urlTasks.ADD
              ? 'Add URL'
              : currentAction === urlTasks.EDIT
              ? 'Edit URL'
              : 'Delete URL'
          }
          message={
            currentAction === urlTasks.EDIT ? (
              <form
                className="flex flex-col gap-2 items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <InputField
                  name="title"
                  type="text"
                  labelName="Title"
                  icon="fluent:slide-text-title-edit-16-regular"
                  placeholder="Enter Title"
                  value={editFormData.title}
                  error={error?.title}
                  onChange={handleFormInputChange}
                  classNames={{
                    input:
                      'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
                    label: 'text-black font-semibold text-shadow-gray-100',
                  }}
                />
                <InputField
                  name="expiresAt"
                  type="date"
                  labelName="Expiry Date"
                  icon="line-md:calendar"
                  placeholder="Enter Expiry Date"
                  value={editFormData.expiresAt}
                  error={error?.expiresAt}
                  onChange={handleFormInputChange}
                  classNames={{
                    input:
                      'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
                    label: 'text-black font-semibold text-shadow-gray-100',
                  }}
                />

                <div className="flex flex-row gap-4 mt-4">
                  <button
                    className="text-xs font-bold text-white bg-red-950 border-0 rounded-2xl p-4"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-xs font-bold text-white bg-blue-950 border-0 rounded-2xl p-4"
                    type="submit"
                  >
                    Edit URL
                  </button>
                </div>
              </form>
            ) : currentAction === urlTasks.ADD ? (
              <form
                className="flex flex-col gap-2 items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <InputField
                  name="title"
                  type="text"
                  labelName="Title"
                  icon="fluent:slide-text-title-edit-16-regular"
                  placeholder="Enter Title"
                  value={editFormData.title}
                  error={error?.title}
                  onChange={handleFormInputChange}
                  classNames={{
                    input:
                      'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
                    label: 'text-black font-semibold text-shadow-gray-100',
                  }}
                />
                <InputField
                  name="originalURL"
                  type="text"
                  labelName="Original Url"
                  icon="flowbite:link-outline"
                  placeholder="Enter Url"
                  value={editFormData.originalURL}
                  error={error?.originalURL}
                  onChange={handleFormInputChange}
                  classNames={{
                    input:
                      'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
                    label: 'text-black font-semibold text-shadow-gray-100',
                  }}
                />
                <InputField
                  name="expiresAt"
                  type="date"
                  labelName="Expiry Date"
                  icon="line-md:calendar"
                  placeholder="Enter Expiry Date"
                  value={editFormData.expiresAt}
                  error={error?.expiresAt}
                  onChange={handleFormInputChange}
                  classNames={{
                    input:
                      'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
                    label: 'text-black font-semibold text-shadow-gray-100',
                  }}
                />

                <div className="flex flex-row gap-4 mt-4">
                  <button
                    className="text-xs font-bold text-white bg-red-950 border-0 rounded-2xl p-4"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-xs font-bold text-white bg-blue-950 border-0 rounded-2xl p-4"
                    type="submit"
                  >
                    Add URL
                  </button>
                </div>
              </form>
            ) : (
              <span>Deleting the Url...</span>
            )
          }
          onCancel={closeModal}
          onConfirm={
            currentAction === urlTasks.DELETE
              ? openConfirmation
              : currentAction === urlTasks.EDIT
              ? handleSubmit
              : closeModal
          }
        />
      )}

      {confirmationOpen && currentAction !== urlTasks.ADD && (
        <ConfirmationDialogBox
          isOpen={confirmationOpen}
          trigger={currentAction === urlTasks.EDIT ? 'Edit URL' : 'Delete URL'}
          title={
            currentAction === urlTasks.EDIT
              ? 'Edit Confirmation'
              : 'Delete Confirmation'
          }
          message={
            currentAction === urlTasks.EDIT
              ? 'Are you sure you want to edit this URL?'
              : 'Are you sure you want to delete this URL?'
          }
          onCancel={closeConfirmation}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};
