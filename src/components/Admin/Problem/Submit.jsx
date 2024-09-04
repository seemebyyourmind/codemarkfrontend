import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSubmitsByProblemId } from '../../../services/admin/ProblemApi';
import { SimplePagination } from '../SimplePagination';

const Submit = () => {
  const { id } = useParams();
  const [submits, setSubmits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubmits();
  }, [id, currentPage]);

  const fetchSubmits = async () => {
    try {
      setLoading(true);
      const response = await getSubmitsByProblemId(id, currentPage);
      setSubmits(response.submits.submits);
      setTotalPages(response.submits.totalPages);
      setLoading(false);
    } catch (error) {
      setError('Đã xảy ra lỗi khi tải danh sách nộp bài');
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div className="text-center mt-8">Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">Danh sách nộp bài</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-600">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-white">Người dùng</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-white">Ngôn ngữ</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-white">Trạng thái</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-white">Số test đúng</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-white">Tổng số test</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-white">Điểm</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-white">Lỗi</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-white">Thời gian</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-white">Bộ nhớ</th>
            </tr>
          </thead>
          <tbody>
            {submits.map((submit) => (
              <tr key={submit.submit_id} className="border-b dark:border-gray-600">
                <td className="px-4 py-2 dark:text-white">{submit.username}</td>
                <td className="px-4 py-2 dark:text-white">{submit.language_id}</td>
                <td className="px-4 py-2 dark:text-white">{submit.status}</td>
                <td className="px-4 py-2 dark:text-white">{submit.numberTestcasePass}</td>
                <td className="px-4 py-2 dark:text-white">{submit.numberTestcase}</td>
                <td className="px-4 py-2 dark:text-white">{submit.points}</td>
                <td className="px-4 py-2 dark:text-white">{submit.error}</td>
                <td className="px-4 py-2 dark:text-white">{submit.timeExecute}</td>
                <td className="px-4 py-2 dark:text-white">{submit.memoryUsage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <SimplePagination 
          currentPage={currentPage} 
          numberPage={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export default Submit;
