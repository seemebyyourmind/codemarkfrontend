import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getSubmitsByUserId } from '../../services/admin/SubmitApi';

const Submit = () => {
  const userId = useSelector(state => state.auth.user.user_id);
  const [submits, setSubmits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSubmits, setTotalSubmits] = useState(0);

  useEffect(() => {
    fetchSubmits();
  }, [currentPage]);

  const fetchSubmits = async () => {
    try {
      const response = await getSubmitsByUserId(userId, currentPage);
      setSubmits(response.submits);
      setCurrentPage(parseInt(response.currentPage));
      setTotalPages(response.totalPages);
      setTotalSubmits(response.totalSubmits);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Danh sách submit của bạn</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID Submit</th>
              <th className="py-2 px-4 border-b text-left">Bài toán</th>
              <th className="py-2 px-4 border-b text-left">Trạng thái</th>
              <th className="py-2 px-4 border-b text-left">Số test case đạt</th>
              <th className="py-2 px-4 border-b text-left">Tổng số test case</th>
              <th className="py-2 px-4 border-b text-left">Điểm</th>
              <th className="py-2 px-4 border-b text-left">Thời gian thực thi</th>
              <th className="py-2 px-4 border-b text-left">Bộ nhớ sử dụng</th>
            </tr>
          </thead>
          <tbody>
            {submits.map((submit) => (
              <tr key={submit.submit_id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{submit.submit_id}</td>
                <td className="py-2 px-4 border-b">{submit.title}</td>
                <td className="py-2 px-4 border-b">{submit.status}</td>
                <td className="py-2 px-4 border-b">{submit.numberTestcasePass}</td>
                <td className="py-2 px-4 border-b">{submit.numberTestcase}</td>
                <td className="py-2 px-4 border-b">{submit.points}</td>
                <td className="py-2 px-4 border-b">{submit.timeExecute}</td>
                <td className="py-2 px-4 border-b">{submit.memoryUsage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span>Tổng số submit: {totalSubmits}</span>
        <div>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-2 bg-primary text-white rounded"
          >
            Trang trước
          </button>
          <span>Trang {currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 ml-2 bg-primary text-white rounded"
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default Submit;
