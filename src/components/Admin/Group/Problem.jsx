import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemsInGroup, removeProblemFromGroup, getProblemsWithGroupStatus, addProblemToGroup } from '../../../services/admin/GroupApi';

const GroupProblems = () => {
  const { id } = useParams();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProblems, setTotalProblems] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [popupProblems, setPopupProblems] = useState([]);
  const [popupCurrentPage, setPopupCurrentPage] = useState(1);
  const [popupTotalPages, setPopupTotalPages] = useState(1);
  const [popupTotalProblems, setPopupTotalProblems] = useState(0);

  useEffect(() => {
    fetchProblems();
    console.log(problems);
  }, [id, currentPage]);

  useEffect(() => {
    fetchPopupProblems();
  }, [popupCurrentPage]);

  const fetchProblems = async () => {
    try {
      const response = await getProblemsInGroup(id, currentPage);
      setProblems(response.problems);
      setCurrentPage(parseInt(response.currentPage));
      setTotalPages(response.totalPages);
      setTotalProblems(response.totalProblems);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProblem = async (problemId) => {
    try {
      await removeProblemFromGroup(problemId, id);
      fetchProblems();
      fetchPopupProblems();
    } catch (error) {
      setError(`Lỗi khi xóa bài toán khỏi nhóm: ${error.message}`);
    }
  };

  const handleAddProblem = async (problemId) => {
    try {
      await addProblemToGroup(problemId, id);
      fetchPopupProblems();
      fetchProblems();
    } catch (error) {
      setError(`Lỗi khi thêm bài toán vào nhóm: ${error.message}`);
    }
  };

  const fetchPopupProblems = async () => {
    try {
      const response = await getProblemsWithGroupStatus(id, popupCurrentPage, searchKeyword);
      setPopupProblems(response.problems);
      setPopupCurrentPage(parseInt(response.currentPage));
      setPopupTotalPages(response.totalPages);
      setPopupTotalProblems(response.totalProblems);
    } catch (error) {
      setError(`Lỗi khi lấy danh sách bài toán: ${error.message}`);
    }
  };

  const handleSearch = () => {
    setPopupCurrentPage(1);
    fetchPopupProblems();
  };

  if (loading) return <div className="text-center mt-8">Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Danh sách bài toán của nhóm</h1>
      <button
        onClick={() => setShowPopup(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Thêm bài toán
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Tiêu đề</th>
              <th className="py-2 px-4 border-b text-left">Độ khó</th>
              <th className="py-2 px-4 border-b text-left">Ngày tạo</th>
              <th className="py-2 px-4 border-b text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.problem_id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{problem.problem_id}</td>
                <td className="py-2 px-4 border-b">{problem.title}</td>
                <td className="py-2 px-4 border-b">{problem.difficulty}</td>
                <td className="py-2 px-4 border-b">{problem.created}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleRemoveProblem(problem.problem_id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span>Tổng số bài toán: {totalProblems}</span>
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

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Thêm bài toán vào nhóm</h2>
            <div className="mb-4 flex">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm kiếm bài toán..."
                className="flex-grow px-3 py-2 border rounded-l"
              />
              <button
                onClick={handleSearch}
                className="px-3 py-1 bg-blue-500 text-white rounded-r hover:bg-blue-600 text-sm"
              >
                Tìm kiếm
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-1 px-2 border-b text-left">ID</th>
                    <th className="py-1 px-2 border-b text-left">Tiêu đề</th>
                    <th className="py-1 px-2 border-b text-left">Độ khó</th>
                    <th className="py-1 px-2 border-b text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {popupProblems.map((problem) => (
                    <tr key={problem.problem_id} className="hover:bg-gray-50">
                      <td className="py-1 px-2 border-b">{problem.problem_id}</td>
                      <td className="py-1 px-2 border-b">{problem.title}</td>
                      <td className="py-1 px-2 border-b">{problem.difficulty}</td>
                      <td className="py-1 px-2 border-b">
                        {problem.InGroup === 0 ? (
                          <button
                            onClick={() => handleAddProblem(problem.problem_id)}
                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                          >
                            Thêm vào nhóm
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRemoveProblem(problem.problem_id)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                          >
                            Xóa khỏi nhóm
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm">Tổng số bài toán: {popupTotalProblems}</span>
              <button
                onClick={() => setShowPopup(false)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-gray-600 text-sm"
              >
                Đóng
              </button>
              <div>
                <button
                  onClick={() => {
                    if (popupCurrentPage > 1) {
                      setPopupCurrentPage(prev => prev - 1);
                    }
                  }}
                  disabled={popupCurrentPage === 1}
                  className={`px-3 py-1 mr-2 text-white rounded text-sm ${popupCurrentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
                >
                  Trang trước
                </button>
                <span className="text-sm">Trang {popupCurrentPage} / {popupTotalPages}</span>
                <button
                  onClick={() => {
                    if (popupCurrentPage < popupTotalPages) {
                      setPopupCurrentPage(prev => prev + 1);
                    }
                  }}
                  disabled={popupCurrentPage === popupTotalPages}
                  className={`px-3 py-1 ml-2 text-white rounded text-sm ${popupCurrentPage === popupTotalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
                >
                  Trang sau
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupProblems;
