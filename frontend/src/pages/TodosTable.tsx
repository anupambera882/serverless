import { PaginationResponse, Response, TodoTypes } from '../types/interface';
import DataTable from '../components/DataTable';
import { columns } from '../types/type';
import { useEffect, useState } from 'react';
import PRIVATE_HTTP from '../HTTP';
import AppBar from '../components/AppBar';
import TodoSkeleton from '../components/TodoSkeleton';
import Button from '../components/Button';
import FilterComponent, { Filter } from '../components/Filter';

const TodosTable = () => {
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(2);
  const [totalNumberOfData, setTotalNumberOfData] = useState(0);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    (async () => {
      try {
        const res = await PRIVATE_HTTP.get(`/api/v1/todo/all`,
          { params: { limit: limitPerPage, page: currentPage, filter: JSON.stringify(filters), sort: JSON.stringify({ content: 'desc', createdAt: 'desc' }) } }
        );
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
  }, [currentPage, limitPerPage, filters]);

  const totalPages = Math.ceil(totalNumberOfData / limitPerPage);

  const handleApplyFilters = (appliedFilters: Filter[]) => {
    const newFilters = appliedFilters.reduce<{ [key: string]: string }>((acc, filter) => {
      acc[filter.field] = filter.value;
      return acc;
    }, {});
    setFilters(newFilters);
  };

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
        <FilterComponent fields={columns} onApplyFilters={handleApplyFilters} />
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
