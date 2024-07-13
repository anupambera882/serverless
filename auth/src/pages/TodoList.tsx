import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { TodoTypes } from "../types/interface";

export interface Column {
  header: string;
  key: keyof TodoTypes;
  type: 'number' | 'boolean' | 'Date' | 'string'
}

const columns: Column[] = [{ header: 'ID', key: 'id', type: 'number' }, { header: 'Title', key: 'title', type: 'string' }, { header: 'Content', key: 'content', type: "string" }, { header: 'IsDone', key: 'isDone', type: "boolean" }, { header: 'CreatedAt', key: 'createdAt', type: 'Date' }, { header: 'UpdateAt', key: 'updateAt', type: 'Date' }]

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof TodoTypes; direction: 'asc' | 'desc' }>({
    key: 'createdAt', direction: "desc"
  });

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
        return 'type not implement';
        break;
    }
  }

  useEffect(() => {
    let isMounted = true;
    // const controller = new AbortController();

    (async () => {
      try {
        const response = await axiosPrivate.get('/api/v1/todo/all', { params: { filter: JSON.stringify({}), sort: JSON.stringify({ [sortConfig.key]: sortConfig.direction }) } });
        isMounted && setTodos(response.data.response.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    })();

    return () => {
      isMounted = false;
      // controller.abort();
    }
  }, [axiosPrivate, location, navigate, sortConfig.direction, sortConfig.key])

  return (
    <>
      <table className="w-full bg-white mt-5 border-collapse">
        <thead>
          <tr>
            {columns.map((column) =>
              <th className="py-2 px-4 border-b-2 text-left cursor-pointer border border-gray-300 p-2 bg-gray-200"
                onClick={() => requestSort(column.key)}
              >
                {column.header}
                {sortConfig.key === column.key && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {todos.map((todo: TodoTypes) => {
            return <tr key={todo.id} className="border-b cursor-pointer" onClick={() => navigate(`/todo/${todo.id}`)}>
              {columns.map((column) => <td className="py-2 px-4 border border-gray-300">{perseData(todo[column.key])}</td>
              )}
            </tr>
          })}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
