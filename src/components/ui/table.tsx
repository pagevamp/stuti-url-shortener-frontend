'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { TableHeadProps } from '@/src/core/types/url-types';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-fit overflow-x-auto bg-white mx-10 my-10 border-2 border-cyan-950 rounded-lg shadow-2xl"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b-cyan-950 px-auto  py-2', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0 px-6 py-2', className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b border-cyan-950 transition-colors',
        className
      )}
      {...props}
    />
  );
}

function TableHead({ slot, children, className, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium [&th]:last:border-r-0 [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]',
        className
      )}
      {...props}
    >
      {slot}
      {children}
    </th>
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-6 align-middle [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5 [&td]:last:border-r-0 border-r border-gray-100 overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]',
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        'text-muted-foreground my-4 text-sm justify-center',
        className
      )}
      {...props}
    ></caption>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
