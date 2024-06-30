import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";
import TodosTable from "./pages/TodosTable";
import Home from "./pages/Home";
import CreateTodo from "./pages/CreateTodo";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/todo/:id" element={<Todo />} />
      <Route path="/todos" element={<TodosTable />} />
      <Route path="/create-todo" element={<CreateTodo />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
