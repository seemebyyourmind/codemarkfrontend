import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../../../features/auth/authSlice';
import { getProblemsInGroup } from '../../../services/admin/GroupApi';

const Group = () => {
  const { groups } = useSelector(selectAuth);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProblems, setTotalProblems] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedGroup) {
      fetchProblems(selectedGroup.group_id, currentPage);
    }
  }, [selectedGroup, currentPage]);

  const fetchProblems = async (groupId, page) => {
    try {
      console.log("groupid:", groupId, page);
      const response = await getProblemsInGroup(groupId, page);
      console.log(response);
      setProblems(response.problems);
      setCurrentPage(parseInt(response.currentPage));
      setTotalPages(response.totalPages);
      setTotalProblems(response.totalProblems);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bài tập:', error);
    }
  };

  const handleViewProblem = (problemId) => {
    navigate(`/problem/${problemId}`);
  };

  return (
    <div className="flex">
      <div className="w-1/3 pr-4">
        <h2 className="text-xl font-bold mb-4">Danh sách nhóm</h2>
        <ul>
          {groups.map((group) => (
            <li
              key={group.group_id}
              className={`cursor-pointer p-2 ${
                selectedGroup && selectedGroup.group_id === group.group_id ? 'bg-blue-100' : ''
              }`}
              onClick={() => setSelectedGroup(group)}
            >
              {group.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-2/3 pl-4">
        <h2 className="text-xl font-bold mb-4">
          {selectedGroup ? `Bài tập của ${selectedGroup.name}` : 'Chọn một nhóm'}
        </h2>
        {selectedGroup ? (
          <div>
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
                          onClick={() => handleViewProblem(problem.problem_id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Xem bài tập
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
          </div>
        ) : (
          <p>Vui lòng chọn một nhóm để xem danh sách bài tập</p>
        )}
      </div>
    </div>
  );
};

export default Group;
