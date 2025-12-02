'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { Icon } from '@iconify/react';
import { useUrls } from '@/src/hooks/useUrls';
import Modal from '@/src/components/commom/Modal/Modal';
import { InputField } from '@/src/components/commom/InputField.tsx/InputField';
import { ConfirmationDialogBox } from '@/src/components/commom/ConfirmationBox/ConfirmationDialogBox';
import { UrlTableTypes } from '@/src/core/types/url-types';
import { Button } from '@/src/components/commom/Button/Button';
import { SearchComponent } from '@/src/components/commom/SearchComponent.tsx/SearchComponent';

const dummyData: UrlTableTypes[] = [
  {
    user_id: 'asdfghjkl123456789',
    title: 'One',
    short_code: 'One',
    original_url: 'ONE.ONE',
    updated_at: '2025-12-01',
    created_at: '2025-12-01',
    deleted_at: '2025-12-01',
    expires_at: '2025-12-01',
  },
  {
    user_id: 'asdfghjkl123456789',
    title: 'One',
    short_code: 'One',
    original_url: 'ONE.ONE',
    updated_at: '2025-12-01',
    created_at: '2025-12-01',
    deleted_at: '2025-12-01',
    expires_at: '2025-12-01',
  },
  {
    user_id: 'asdfghjkl123456789',
    title: 'Two',
    short_code: 'Two',
    original_url: 'TWO.TWO',
    updated_at: '2025-12-01',
    created_at: '2025-12-01',
    deleted_at: '2025-12-01',
    expires_at: '2025-12-01',
  },
  {
    user_id: 'asdfghjkl123456789',
    title: 'Three',
    short_code: 'Three',
    original_url: 'THREE.THREE',
    updated_at: '2025-12-01',
    created_at: '2025-12-01',
    deleted_at: '2025-12-01',
    expires_at: '2025-12-01',
  },
  {
    user_id: 'asdfghjkl123456789',
    title: 'Four',
    short_code: 'Four',
    original_url: 'FOUR.FOUR',
    updated_at: '2025-12-01',
    created_at: '2025-12-01',
    deleted_at: '2025-12-01',
    expires_at: '2025-12-01',
  },
];

export const UrlsComponent = () => {
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
  } = useUrls();

  const actions = [
    { icon: 'mdi:pencil', title: 'edit', onClick: () => openModal('edit') },
    { icon: 'gg:trash', title: 'delete', onClick: () => openModal('delete') },
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

  return (
    <div className="my-20 mx-10 p-5 bg-gray-200 w-fit">
      <section className="flex flex-row mx-10 my-5">
        <SearchComponent />
        <Button className="flex flex-row gap-3 h-12 text-white font-semibold px-2 place-self-end">
          Shorten New Url{' '}
          <Icon
            icon="icon-park-outline:clothes-pants-short"
            height={22}
            width={22}
          />
        </Button>
      </section>

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
          {dummyData.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.user_id}</TableCell>
              <TableCell>{data.title}</TableCell>
              <TableCell>{data.short_code}</TableCell>
              <TableCell>{data.original_url}</TableCell>
              <TableCell>{data.created_at}</TableCell>
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
      </Table>

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          trigger={currentAction === 'edit' ? 'Edit URL' : 'Delete URL'}
          title={currentAction === 'edit' ? 'Edit URL' : 'Delete URL'}
          message={
            currentAction === 'edit' ? (
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
                  icon="sc"
                  placeholder="Title"
                  value={editFormData.title}
                  onChange={handleFormInputChange}
                />
                <InputField
                  name="expiresAt"
                  type="text"
                  labelName="Expiry Date"
                  icon="sxax"
                  placeholder="Title"
                  value={editFormData.expiresAt}
                  onChange={handleFormInputChange}
                />
                <button type="submit">Submit</button>
              </form>
            ) : (
              <span>Are you sure you want to delete this URL?</span>
            )
          }
          onCancel={closeModal}
          onConfirm={currentAction === 'delete' ? openConfirmation : undefined}
        />
      )}

      {confirmationOpen && (
        <ConfirmationDialogBox
          isOpen={confirmationOpen}
          trigger={currentAction === 'edit' ? 'Edit URL' : 'Delete URL'}
          title={
            currentAction === 'edit'
              ? 'Edit Confirmation'
              : 'Delete Confirmation'
          }
          message={
            currentAction === 'edit'
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
