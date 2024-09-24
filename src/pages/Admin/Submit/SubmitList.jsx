import { useState, useEffect } from 'react';
import { getAllSubmits, deleteSubmit } from '../../../services/admin/SubmitApi';
import { FaEye, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SubmitList = () => {
  const [submits, setSubmits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalSubmits, setTotalSubmits] = useState(0);
  const [sortBy, setSortBy] = useState('submit_id');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSubmits = async (page) => {
    try {
      setIsLoading(true);
      const data = await getAllSubmits(page, 15, sortBy);
      setSubmits(data.submits);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalSubmits(data.totalSubmits);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmits(currentPage);
  }, [currentPage, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = async (submitId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa submit này?')) {
      try {
        await deleteSubmit(submitId);
        fetchSubmits(currentPage);
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa submit');
      }
    }
  };

  const handleView = (submitId) => {
    navigate(`/admin/submit/detail/${submitId}`);
  };

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Submit</h1>
      
      <div className="mb-4">
        <label htmlFor="sortBy" className="mr-2">Sắp xếp theo:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortChange}
          className="border p-2 rounded"
        >
          <option value="submit_id">Submit ID</option>
          <option value="user_id">User ID</option>
          <option value="problem_id">Problem ID</option>
        </select>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Submit ID</th>
            <th className="py-2 px-4 border-b text-left">User</th>
            <th className="py-2 px-4 border-b text-left">Problem</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Points</th>
            <th className="py-2 px-4 border-b text-left">Testcases</th>
            <th className="py-2 px-4 border-b text-left">Thời gian</th>

            <th className="py-2 px-4 border-b text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {submits.map((submit) => (
            <tr key={submit.submit_id}>
              <td className="py-2 px-4 border-b">{submit.submit_id}</td>
              <td className="py-2 px-4 border-b">{submit.user_id} - {submit.username}</td>
              <td className="py-2 px-4 border-b">{submit.problem_id} - {submit.title}</td>
              <td className="py-2 px-4 border-b">{submit.status}</td>
              <td className="py-2 px-4 border-b">{submit.points}</td>
              <td className="py-2 px-4 border-b">{submit.numberTestcasePass}/{submit.numberTestcase}</td>
              <td className="py-2 px-4 border-b">{new Date(submit.submit_date).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleView(submit.submit_id)} className="mr-2 text-blue-500">
                  <FaEye />
                </button>
                <button onClick={() => handleDelete(submit.submit_id)} className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <span>Tổng số submit: {totalSubmits}</span>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-2 bg-primary text-white rounded disabled:opacity-50"
          >
            Trang trước
          </button>
          <span>Trang {currentPage} / {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 ml-2 bg-primary text-white rounded disabled:opacity-50"
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitList;
