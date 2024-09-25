import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PropsWithChildren } from "react";
import { v4 as uuidv4 } from "uuid";

type TableHeaderType = PropsWithChildren & {
  colSpan: number;
};
function TableHeader({ children, colSpan }: Readonly<TableHeaderType>) {
  return (
    <th
      colSpan={colSpan}
      className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
    >
      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
        {children}
      </p>
    </th>
  );
}

type TableDataType = PropsWithChildren;
function TableData({ children }: Readonly<TableDataType>) {
  return (
    <td className="p-4 border-b border-blue-gray-50">
      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        {children}
      </p>
    </td>
  );
}

type Props = {
  columns: any[];
  data: any[];
};
const AppTable = ({ columns, data = [] }: Props) => {
  const tableInstance = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const TableHead = () => {
    return (
      <thead>
        {tableInstance.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeader colSpan={header.colSpan} key={uuidv4()}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHeader>
            ))}
          </tr>
        ))}
      </thead>
    );
  };

  const TableBody = () => {
    return (
      <tbody>
        {tableInstance.getRowModel().rows?.map((row, idx) => (
          <tr key={idx}>
            {row.getVisibleCells().map((cell) => (
              <TableData key={uuidv4()}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableData>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      <table className="w-full text-left table-auto min-w-max">
        <TableHead />
        <TableBody />
      </table>
    </div>
  );
};

export default AppTable;
