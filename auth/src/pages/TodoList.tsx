import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { TodoTypes } from "../types/interface";
import Button from "../components/Button";

export interface Column {
  header: string;
  key: keyof TodoTypes;
  type: 'number' | 'boolean' | 'Date' | 'string';
}

const columns: Column[] = [
  { header: 'ID', key: 'id', type: 'number' },
  { header: 'Title', key: 'title', type: 'string' },
  { header: 'Content', key: 'content', type: "string" },
  { header: 'IsDone', key: 'isDone', type: "boolean" },
  { header: 'CreatedAt', key: 'createdAt', type: 'Date' },
  { header: 'UpdateAt', key: 'updateAt', type: 'Date' }
];

export interface Filter {
  field: string;
  value: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof TodoTypes; direction: 'asc' | 'desc' }>({
    key: 'createdAt', direction: "desc"
  });
  const [currentFilterField, setCurrentFilterField] = useState<string>('');
  const [currentFilterValue, setCurrentFilterValue] = useState<string>('');
  const [filters, setFilters] = useState<Filter[]>([]);
  const [filter, setFilter] = useState<{ [key: string]: string }>({});

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const requestSort = (key: keyof TodoTypes) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleAddFilter = () => {
    if (currentFilterField && currentFilterValue) {
      setFilters([...filters, { field: currentFilterField, value: currentFilterValue }]);
      setCurrentFilterField('');
      setCurrentFilterValue('');
    }
  };

  const handleRemoveFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    const newFilters = filters.filter(filter => filter.field && filter.value).reduce<{ [key: string]: string }>((acc, filter) => {
      acc[filter.field] = filter.value;
      return acc;
    }, {});
    setFilter(newFilters);
  };

  const perseData = (value: number | boolean | Date | string) => {
    switch (typeof value) {
      case 'number':
        return value.toString();
      case 'boolean':
        return value.toString();
      case 'object':
        return value.toUTCString();
      case 'string':
        return value;
      default:
        return 'type not implemented';
    }
  };

  useEffect(() => {
    let isMounted = true;
    // const controller = new AbortController();

    (async () => {
      try {
        const response = await axiosPrivate.get('/api/v1/todo/all', { params: { filter: JSON.stringify(filter), sort: JSON.stringify({ [sortConfig.key]: sortConfig.direction }) } });
        if (isMounted) {
          setTodos(response.data.response.data);
        }
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    })();

    return () => {
      isMounted = false;
      // controller.abort();
    }
  }, [axiosPrivate, filter, location, navigate, sortConfig.direction, sortConfig.key])

  return (
    <>
      {/* for table filter */}
      <div className="p-5 my-0 mx-auto">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4 items-center">
            <select
              value={currentFilterField}
              onChange={(e) => setCurrentFilterField(e.target.value)}
              className="p-2 border rounded-md bg-white"
            >
              <option value="">Select Filter</option>
              {columns
                .filter((field) => !filters.some((filter) => filter.field === field.key))
                .map((field) => (
                  <option key={field.key} value={field.key}>
                    {field.header}
                  </option>
                ))}
            </select>
            <input
              type="text"
              value={currentFilterValue}
              onChange={(e) => setCurrentFilterValue(e.target.value)}
              placeholder="Filter value"
              className="p-2 border rounded-md bg-white focus:border-blue-500 outline-none"
            />
            <Button onClick={handleAddFilter} label="Add Filter" />
          </div>
          <div className="flex">
            {filters.map((filter, index) => (
              <div key={index} className="flex items-center mx-2 bg-blue-300">
                <span>{filter.field}: {filter.value}</span>
                <Button onClick={() => handleRemoveFilter(index)} label="x" />
              </div>
            ))}
          </div>
          <div className="flex space-x-4 items-center">
            <Button onClick={handleApplyFilters} label="Apply Filters" />
            <Button onClick={() => setFilters([])} label="Clear All" />
          </div>
        </div>
        {/* for table */}
        <table className="w-full bg-white mt-5 border-collapse">
          <thead>
            <tr>
              {/* for data table sorting */}
              {columns.map((column) => (
                <th key={column.key}
                  className="py-2 px-4 border-b-2 text-left cursor-pointer border border-gray-300 p-2 bg-gray-200"
                  onClick={() => requestSort(column.key)}
                >
                  {column.header}
                  {sortConfig.key === column.key && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {todos.map((todo: TodoTypes) => (
              <tr key={todo.id} className="border-b cursor-pointer" onClick={() => navigate(`/todo/${todo.id}`)}>
                {columns.map((column) => (
                  <td key={column.key} className="py-2 px-4 border border-gray-300">{perseData(todo[column.key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TodoList;
