import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserSubmits } from '../../../services/admin/UserApi';

const Submit = () => {
  const { id } = useParams();
  const [submits, setSubmits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchSubmits();
  }, [id, currentPage]);

  const fetchSubmits = async () => {
    try {
      const response = await getUserSubmits(id, currentPage);
      setSubmits(response.submits.submits);
      setTotalPages(Math.ceil(response.submits.total / 15)); // Giả sử mỗi trang có 15 mục
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-600 dark:text-gray-400">Đang tải...</p>;
  if (error) return <p className="text-center text-red-600 dark:text-red-400">Lỗi: {error.message}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Danh Sách Submit</h1>
      {submits.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">ID Submit</th>
                <th scope="col" className="px-6 py-3">ID Bài tập</th>
                <th scope="col" className="px-6 py-3">Trạng thái</th>
                <th scope="col" className="px-6 py-3">Số test case đạt</th>
                <th scope="col" className="px-6 py-3">Tổng số test case</th>
                <th scope="col" className="px-6 py-3">Điểm</th>
                <th scope="col" className="px-6 py-3">Lỗi</th>
                <th scope="col" className="px-6 py-3">ID Ngôn ngữ</th>
                <th scope="col" className="px-6 py-3">Thời gian thực thi</th>
                <th scope="col" className="px-6 py-3">Bộ nhớ sử dụng</th>
              </tr>
            </thead>
            <tbody>
              {submits.map(submit => (
                <tr key={submit.submit_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{submit.submit_id}</td>
                  <td className="px-6 py-4">{submit.problem_id}</td>
                  <td className="px-6 py-4">{submit.status}</td>
                  <td className="px-6 py-4">{submit.numberTestcasePass}</td>
                  <td className="px-6 py-4">{submit.numberTestcase}</td>
                  <td className="px-6 py-4">{submit.points}</td>
                  <td className="px-6 py-4">{submit.error}</td>
                  <td className="px-6 py-4">{submit.language_id}</td>
                  <td className="px-6 py-4">{submit.timeExecute}</td>
                  <td className="px-6 py-4">{submit.memoryUsage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Không có thông tin submit.</p>
      )}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 disabled:opacity-50"
        >
          Trang trước
        </button>
        <span className="text-gray-600 dark:text-gray-400">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default Submit;