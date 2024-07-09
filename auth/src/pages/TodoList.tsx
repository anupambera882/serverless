import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const TodoList = () => {
  const [users, setUsers] = useState<{ title: string }[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    // const controller = new AbortController();

    (async () => {
      try {
        const response = await axiosPrivate.get('/api/v1/todo/all?filter={}&sort={}');
        isMounted && setUsers(response.data.response.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    })();

    return () => {
      isMounted = false;
      // controller.abort();
    }
  }, [axiosPrivate, location, navigate])

  return (
    <article>
      <h2>Users List</h2>
      {users?.length
        ? (
          <ul>
            {users.map((user, i) => <li key={i}>{user?.title}</li>)}
          </ul>
        ) : <p>No users to display</p>
      }
    </article>
  );
};

export default TodoList;
