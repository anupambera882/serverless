import { PaginationResponse, Response, TodoTypes } from '../types/interface';
import DataTable from '../components/DataTable';
import { columns } from '../types/type';
import { useEffect, useState } from 'react';
import PRIVATE_HTTP from '../HTTP';
import AppBar from '../components/AppBar';
import TodoSkeleton from '../components/TodoSkeleton';
import Button from '../components/Button';
const TodosTable = () => {
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(2);
  const [totalNumberOfData, setTotalNumberOfData] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await PRIVATE_HTTP.get(`/api/v1/todo/all?limit=${limitPerPage}&page=${currentPage}`);
        const { response } = res.data as Response<PaginationResponse<TodoTypes>>;
        setCurrentPage(response.metaData.pageNumber);
        setLimitPerPage(response.metaData.limitCount);
        setTotalNumberOfData(response.metaData.total);
        setTodos(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentPage, limitPerPage])

  const totalPages = Math.ceil(totalNumberOfData / limitPerPage);

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div>
            <TodoSkeleton />
            <TodoSkeleton />
            <TodoSkeleton />
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
        <div className='ml-7 flex'>
          <label htmlFor="dropdown">Rows per page:</label>
          <select id="dropdown" name="options" onChange={(e) => {
            setLimitPerPage(Number(e.target.value));
            setCurrentPage(0);
          }}>
            <option value={2}> 2</option>
            <option value={5}> 5</option>
            <option value={10}> 10</option>
          </select>
          <div className='mx-7'> {currentPage + 1}-{totalPages} of {totalPages}</div>
          <Button onClick={() => setCurrentPage((currentPage) => currentPage - 1)} name='<' disabled={currentPage === 0} />
          <Button onClick={() => setCurrentPage((currentPage) => currentPage + 1)} name='>' disabled={currentPage === totalPages - 1} />
        </div>
      </>
    );
  }
};

export default TodosTable;
