import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import PersistLogin from './pages/PersistLogin';
import RequireAuth from './pages/RequireAuth';
import { ROLES } from './types/enum';
import TodoList from './pages/TodoList';
import Todo from './pages/Todo';
import CreateTodo from './pages/CreateTodo';
import CheckLogin from './pages/CheckLogin';

function App() {
  return (
    <Routes>
      {/* Redirect from root to /todo */}
      <Route path="/" element={<Navigate to="/todo" />} />

      {/* Public Routes */}
      <Route path="/" element={<CheckLogin />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route path="/todo/" element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN]} />}>
          <Route path="create" element={<CreateTodo />} />
          <Route path="" element={<TodoList />} />
          <Route path=":id" element={<Todo />} />
        </Route>
      </Route>

      {/* Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
