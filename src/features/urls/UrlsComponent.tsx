'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { Icon } from '@iconify/react';
import { urlTasks, useUrls } from '@/src/hooks/useUrls';
import Modal from '@/src/components/commom/Modal/Modal';
import { InputField } from '@/src/components/commom/InputField.tsx/InputField';
import { ConfirmationDialogBox } from '@/src/components/commom/ConfirmationBox/ConfirmationDialogBox';
import { Button } from '@/src/components/commom/Button/Button';
import { SearchComponent } from '@/src/components/commom/SearchComponent.tsx/SearchComponent';
import { Pagination } from '@/src/components/commom/PaginationComponent.tsx/Pagination';
import { Suspense } from 'react';
import { dummyData } from '@/public/data/dummyData';
import { urlOrder } from '@/src/app/(protected)/urls/page';

export const UrlsComponent = ({
  query,
  sort,
  currentPage,
}: {
  query: string;
  sort: urlOrder;
  currentPage: number;
}) => {
  const {
    modalOpen,
    confirmationOpen,
    editFormData,
    currentAction,
    openModal,
    closeModal,
    openConfirmation,
    closeConfirmation,
    handleFormInputChange,
    handleConfirm,
    useFilterTable,
  } = useUrls();

  const add = {
    onClick: () => openModal(urlTasks.add),
  };

  const actions = [
    {
      icon: 'mdi:pencil',
      title: 'edit',
      onClick: () => openModal(urlTasks.edit),
    },
    {
      icon: 'gg:trash',
      title: 'delete',
      onClick: () => openModal(urlTasks.delete),
    },
  ];

  const tableHeaders = [
    'User ID',
    'Title',
    'Shortened URL',
    'Original URL',
    'Created At',
    'Updated At',
    'Deleted At',
    'Expires At',
    'Actions',
  ];

  const itemsPerPage = 5;
  const data = useFilterTable(query, sort, currentPage);

  return (
    <div className="my-20 mx-10 p-5 bg-gray-200 w-fit">
      <section className="flex flex-row mx-10 my-5">
        {/* <section className="flex flex-row gap-2 items-center"> */}
        <SearchComponent />
        {/* <></> */}
        {/* </section> */}

        <Button
          className="flex flex-row gap-3 h-12 text-white font-semibold px-2 place-self-end"
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

      <Suspense key={query + sort + currentPage}>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-t border-[#E6EFF5]">
              {tableHeaders.map((headers) => (
                <TableHead
                  key={headers}
                  className="text-center text-[#0B0704] font-primary text-[16px] py-[14.59px] border-r w-[350px]"
                >
                  {headers}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((data, index) => (
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
                <TableCell> {data.created_at}</TableCell>
                <TableCell>{data.updated_at}</TableCell>
                <TableCell>{data.deleted_at}</TableCell>
                <TableCell>{data.expires_at}</TableCell>
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
            currentAction === urlTasks.add
              ? 'Add URL'
              : currentAction === urlTasks.edit
              ? 'Edit URL'
              : 'Delete URL'
          }
          title={
            currentAction === urlTasks.add
              ? 'Add URL'
              : currentAction === urlTasks.edit
              ? 'Edit URL'
              : 'Delete URL'
          }
          message={
            currentAction === urlTasks.edit ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  openConfirmation();
                }}
                className="flex flex-col gap-2 items-center"
              >
                <InputField
                  name="title"
                  type="text"
                  labelName="Title"
                  icon="fluent:slide-text-title-edit-16-regular"
                  placeholder="Enter Title"
                  value={editFormData.title}
                  onChange={handleFormInputChange}
                  classNames={{
                    inputClassName:
                      'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
                    labelClassname:
                      'text-black font-semibold text-shadow-gray-100',
                  }}
                />
                <InputField
                  name="expiresAt"
                  type="date"
                  labelName="Expiry Date"
                  icon="line-md:calendar"
                  placeholder="Enter Expiry Date"
                  value={editFormData.expiresAt}
                  onChange={handleFormInputChange}
                  classNames={{
                    inputClassName:
                      'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
                    labelClassname:
                      'text-black font-semibold text-shadow-gray-100',
                  }}
                />
              </form>
            ) : currentAction === urlTasks.add ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  openConfirmation();
                }}
                className="flex flex-col gap-2 items-center"
              >
                <InputField
                  name="title"
                  type="text"
                  labelName="Title"
                  icon="fluent:slide-text-title-edit-16-regular"
                  placeholder="Enter Title"
                  value={editFormData.title}
                  onChange={handleFormInputChange}
                  classNames={{
                    inputClassName:
                      'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
                    labelClassname:
                      'text-black font-semibold text-shadow-gray-100',
                  }}
                />
                <InputField
                  name="expiresAt"
                  type="date"
                  labelName="Expiry Date"
                  icon="line-md:calendar"
                  placeholder="Enter Expiry Date"
                  value={editFormData.expiresAt}
                  onChange={handleFormInputChange}
                  classNames={{
                    inputClassName:
                      'bg-white text-sm text-undraw-secondary-100 font-bold min-w-80',
                    labelClassname:
                      'text-black font-semibold text-shadow-gray-100',
                  }}
                />
                <button type="submit">Submit</button>
              </form>
            ) : (
              <span>Deleting the Url...</span>
            )
          }
          onCancel={closeModal}
          onConfirm={
            currentAction === urlTasks.delete ? openConfirmation : undefined
          }
        />
      )}

      {confirmationOpen && (
        <ConfirmationDialogBox
          isOpen={confirmationOpen}
          trigger={currentAction === urlTasks.edit ? 'Edit URL' : 'Delete URL'}
          title={
            currentAction === urlTasks.edit
              ? 'Edit Confirmation'
              : 'Delete Confirmation'
          }
          message={
            currentAction === urlTasks.edit
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
