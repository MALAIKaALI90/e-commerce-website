import React from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const DisplayTable = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm">
          {/* Table Head */}
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-xs tracking-wider">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                <th className="px-4 py-3 border-b text-left font-semibold text-gray-600">
                  Sr. No
                </th>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-3 border-b text-left font-semibold text-gray-600"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="px-4 py-2 font-medium text-gray-800 text-center">
                  {index + 1}
                </td>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DisplayTable
