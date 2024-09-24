import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSubmitsByProblemId,deleteSubmit } from '../../../services/admin/SubmitApi';

import { BsFillTrashFill} from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Submit = () => {
  const { id } = useParams();
  const [submits, setSubmits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSubmits, setTotalSubmits] = useState(0);

  useEffect(() => {
    fetchSubmits();
  }, [id, currentPage]);

  const fetchSubmits = async () => {
    try {
      const response = await getSubmitsByProblemId(id, currentPage);
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
  const handleDelete = async (submitId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa submit này?')) {
      try {
        await deleteSubmit(submitId);
        fetchSubmits();
      } catch (err) {
        setError('Có lỗi xảy ra khi xóa submit');
      }
    }
  };
  if (loading) return <div className="text-center mt-8">Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Danh sách submit của bài toán</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID Submit</th>
              <th className="py-2 px-4 border-b text-left">Người dùng</th>
              <th className="py-2 px-4 border-b text-left">Trạng thái</th>
              <th className="py-2 px-4 border-b text-left">Số test case đạt</th>
              <th className="py-2 px-4 border-b text-left">Tổng số test case</th>
              <th className="py-2 px-4 border-b text-left">Điểm</th>
              <th className="py-2 px-4 border-b text-left">Thời gian thực thi</th>
              <th className="py-2 px-4 border-b text-left">Bộ nhớ sử dụng</th>
              <th className="py-2 px-4 border-b text-left">Time_submit</th>
              <th className="py-2 px-4 border-b text-left">Action</th>

            </tr>
          </thead>
          <tbody>
            {submits.map((submit) => (
              <tr key={submit.submit_id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{submit.submit_id}</td>
                <td className="py-2 px-4 border-b">{submit.username}</td>
                <td className="py-2 px-4 border-b">{submit.status}</td>
                <td className="py-2 px-4 border-b">{submit.numberTestcasePass}</td>
                <td className="py-2 px-4 border-b">{submit.numberTestcase}</td>
                <td className="py-2 px-4 border-b">{submit.points}</td>
                <td className="py-2 px-4 border-b">{submit.timeExecute}</td>
                <td className="py-2 px-4 border-b">{submit.memoryUsage}</td>
                <td className="py-2 px-4 border-b">{new Date(submit.submit_date).toLocaleString()}</td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <span className="actions flex grid-cols-2 gap-4">
                        <BsFillTrashFill
                          className="delete-btn cursor-pointer"
                          onClick={() => handleDelete(submit.submit_id)}
                        />
                          {/* <Link to={`/admin/user/updateuser/${row.user_id}`} className="edit-btn cursor-pointer">
                          <BsFillPencilFill />
                         </Link> */ }  
                        <Link to={`/admin/submit/detail/${submit.submit_id}`} className="detail-btn cursor-pointer">
                          <FaEye />
                        </Link>
                      </span>
                    </td>
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
