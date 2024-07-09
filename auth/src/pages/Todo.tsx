import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { Response, TodoTypes } from "../types/interface";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Todo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState<TodoTypes>();
  const axiosPrivate = useAxiosPrivate();


  useEffect(() => {
    (async () => {
      const res = await axiosPrivate.get(`/api/v1/todo/${id}`);
      const { response } = res.data as Response<TodoTypes>;
      setTodo(response);
      setLoading(false);
    })();
  }, [axiosPrivate, id])

  if (loading || !todo) {
    return <div>
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
    </div>
  }
  return <div>
    {JSON.stringify(todo)}
  </div>
}

export default Todo;
