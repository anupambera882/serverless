import { Response, TodoTypes } from '../types/interface';
import DataTable from '../components/DataTable';
import { columns } from '../types/type';
import { useEffect, useState } from 'react';
import { HTTP } from '../HTTP';
import AppBar from '../components/AppBar';
import TodoSkeleton from '../components/TodoSkeleton';
const TodosTable = () => {
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await HTTP.get("/api/v1/todo/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const { response } = res.data as Response<TodoTypes[]>;
      setTodos(response);
      setLoading(false);
    })();
  }, [])

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div>
            <TodoSkeleton />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <AppBar />
        <div className="p-5 my-0 mx-auto">
          <DataTable columns={columns} data={todos} />
        </div>
      </>
    );
  }
};

export default TodosTable;
