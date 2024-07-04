import { useParams } from "react-router-dom";
import FullBlog from "../components/TodoDetails";
import Spinner from "../components/Spinner";
import AppBar from "../components/AppBar";
import { useEffect, useState } from "react";
import PRIVATE_HTTP from "../HTTP";
import { Response, TodoTypes } from "../types/interface";

const Todo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState<TodoTypes>();

  useEffect(() => {
    (async () => {
      const res = await PRIVATE_HTTP.get(`/api/v1/todo/${id}`);
      const { response } = res.data as Response<TodoTypes>;
      setTodo(response);
      setLoading(false);
    })();
  }, [id])

  if (loading || !todo) {
    return <div>
      <AppBar />
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
    </div>
  }
  return <div>
    <FullBlog todo={todo} />
  </div>
}

export default Todo;
