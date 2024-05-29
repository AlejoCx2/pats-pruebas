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
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

function UserTable({ users, setUserSelected }) {
  const token = useSelector((state) => state.user.value.jwt_access);

  const columns = [
    {
      header: "Cedula",
      accessorKey: "cedula",
    },
    {
      header: "Nombre",
      accessorFn: (row) => `${row.user.first_name} ${row.user.last_name}`,
    },
    {
      header: "Empresa",
      accessorKey: "company.name",
    },
    {
      header: "Cargo",
      accessorKey: "cargo.name",
    },
    {
      header: "Estado",
      cell: ({ row }) => (
        <div
          key={row.id}
          className={`p-1 rounded-md text-xs text-white ${
            row.original.user.is_active ? "bg-green-800" : "bg-red-800"
          }`}
        >
          {row.original.user.is_active ? "Activo" : "Inactivo"}
        </div>
      ),
    },
    {
      header: "Editar",
      cell: ({ row }) => (
        <button
          key={row.id}
          onClick={() => {
            setUserSelected(row.original);
          }}
          className="py-1 px-2 rounded-md text-xs text-white bg-purple_senthia-100 transition-all duration-75 hover:bg-purple_senthia-50 hover:text-purple_senthia-200 hover:scale-105"
        >
          <PencilSquareIcon className="w-4 h-4" />
        </button>
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

  // Si se optimiza se usara esta funcion
  const handelEditRow = (id) => {
    const options = {
      method: "GET", // Método HTTP
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      import.meta.env.VITE_API_URL + `PATS/users/request_user/${id}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setUserSelected(data);
      });
  };

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
      <div className="flex justify-center w-full">
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

export default UserTable;
