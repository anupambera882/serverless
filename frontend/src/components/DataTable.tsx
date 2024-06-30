import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTableProps, TodoTypes } from '../types/interface';

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof TodoTypes | null; direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });
  const navigate = useNavigate();

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) {
      return 0;
    }
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: keyof TodoTypes) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (id: number) => {
    navigate(`/todo/${id}`);
  };

  return (
    <table className="w-full bg-white mt-5 border-collapse">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              onClick={() => requestSort(column.key)}
              className="py-2 px-4 border-b-2 text-left cursor-pointer border border-gray-300 p-2 bg-gray-200"
            >
              {column.header}
              {sortConfig.key === column.key && (sortConfig.direction === 'ascending' ? '🔼' : '🔽')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={row.id} className="border-b cursor-pointer" onClick={() => handleRowClick(row.id)}>
            {columns.map((column) => (
              <td key={column.key} className="py-2 px-4 border border-gray-300">
                {column.key === 'createdAt' || column.key === 'updateAt'
                  ? new Date(row[column.key]).toLocaleDateString()
                  : column.key === 'id' ? (index + 1).toString() : row[column.key]?.toString()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
