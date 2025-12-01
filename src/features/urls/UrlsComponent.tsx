'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { UrlTableIcons, UrlTableTypes } from '@/src/core/types/url-types';
import { useUrls } from '@/src/hooks/useUrls';
import { Icon } from '@iconify/react';

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
    openEditModal,
    openDeleteModal,
  } = useUrls();

  const actions: UrlTableIcons[] = [
    {
      icon: 'mdi:pencil',
      title: 'edit',
      onClick: openEditModal,
    },
    {
      icon: 'gg:trash',
      title: 'delete',
      onClick: openDeleteModal,
    },
  ];

  return (
    <div className="mx-auto my-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-t border-[#E6EFF5] w-[1050px]">
            <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-[14.59px] border-r w-[350px]">
              User ID
            </TableHead>
            <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-[14.59px] border-r w-[350px]">
              Title{' '}
            </TableHead>
            <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-[14.59px] border-r w-[350px]">
              Shortened URL
            </TableHead>
            <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-[14.59px] border-r w-[350px]">
              Original URL
            </TableHead>
            <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-[14.59px] border-r w-[350px]">
              Created At{' '}
            </TableHead>
            <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-[14.59px] border-r w-[350px]">
              Updated At{' '}
            </TableHead>
            <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-[14.59px] w-[350px]">
              Deleted At{' '}
            </TableHead>
            <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-[14.59px] w-[350px]">
              Expires At{' '}
            </TableHead>
            <TableHead className="text-center text-[#0B0704] font-primary text-[16px] py-[14.59px] w-[350px]">
              Actions{' '}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dummyData.map((data, title) => (
            <TableRow key={title}>
              <TableCell>{data.user_id}</TableCell>
              <TableCell>{data.title}</TableCell>
              <TableCell>{data.short_code}</TableCell>
              <TableCell>{data.original_url}</TableCell>
              <TableCell>{data.created_at}</TableCell>
              <TableCell>{data.updated_at}</TableCell>
              <TableCell>{data.deleted_at}</TableCell>
              <TableCell>{data.expires_at}</TableCell>
              <TableCell className="flex flex-row gap-2">
                {actions.map((action, title) => (
                  <span key={title}>
                    <button onClick={action.onClick}>
                      <Icon icon={action.icon} className="text-emerald-900" />
                    </button>
                  </span>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
