import { Response, TodoTypes } from '../types/interface';
import DataTable from '../components/DataTable';
import { columns } from '../types/type';
import { useEffect, useState } from 'react';
import PRIVATE_HTTP from '../HTTP';
import AppBar from '../components/AppBar';
import TodoSkeleton from '../components/TodoSkeleton';
const TodosTable = () => {
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await PRIVATE_HTTP.get("/api/v1/todo/all");
        const { response } = res.data as Response<TodoTypes[]>;
        setTodos(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
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
