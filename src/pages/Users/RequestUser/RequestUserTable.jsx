import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

const getRequestedUserStateStyle = (value) => {
  switch (value) {
    case "Aprobado":
      return "bg-gray-200 text-purple_senthia-200"
    case "Rechazado":
      return "bg-gray-200 text-purple_senthia-200"
    case "Creado":
      return "bg-purple_senthia-75 text-white"
    default:
      return "bg-gray-200 text-purple_senthia-200"
  }
};

function RequestUserTable({ users }) {
  const token = useSelector((state) => state.user.value.jwt_access);
  const columns = [
    {
      header: "Cedula",
      accessorKey: "cedula",
    },
    {
      header: "Nombre",
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    },
    {
      header: "Empresa",
      accessorKey: "company_name",
    },
    {
      header: "Cargo",
      accessorKey: "cargo_name",
    },
    {
      header: "Estado",
      cell: ({ row }) => (
        <div
          key={row.id}
          className={`p-1 rounded-md text-xs font-medium ${
            getRequestedUserStateStyle(row.original.state)
          }`}
        >
          {row.original.state}
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pages = [];
  for (let i = 1; i < table.getPageCount() + 1; i++) {
    pages.push(
      <button className="w-6 rounded-full bg-purple_senthia-25 text-xs font-medium text-purple_senthia-75">
        {i}
      </button>
    );
  }

  return (
    <>
      <table className="w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="rounded-md border-y border-purple_senthia-200"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-1 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
      <div className="mt-2 flex justify-center w-full">
        <button className="p-1 rounded-full bg-purple_senthia-25 text-purple_senthia-75">
          <ChevronDoubleLeftIcon className="w-4 h-4" />
        </button>
        <button className="p-1 rounded-full bg-purple_senthia-25 text-purple_senthia-75">
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        {pages}
        <button className="p-1 rounded-full bg-purple_senthia-25 text-purple_senthia-75">
          <ChevronRightIcon className="w-4 h-4" />
        </button>
        <button className="p-1 rounded-full bg-purple_senthia-25 text-purple_senthia-75">
          <ChevronDoubleRightIcon className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}

export default RequestUserTable;
