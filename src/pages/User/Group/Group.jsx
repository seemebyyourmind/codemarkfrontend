import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../../../features/auth/authSlice';
import { getProblemsInGroup } from '../../../services/admin/GroupApi';
import { getCategories } from '../../../services/admin/CategoryApi';
import Guess from '../../../components/Role/Guess';
import People from '../../../components/Role/People';

const Group = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const { groups } = useSelector(selectAuth);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProblems, setTotalProblems] = useState(0);
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (selectedGroup) {
      fetchProblems(selectedGroup.group_id, currentPage,selectedCategory);
    }
  }, [selectedGroup, currentPage,selectedCategory]);
  useEffect(() => {
    fetchCategories();
 }, []);
  const fetchProblems = async (groupId, page,cate) => {
    try {
      console.log("groupid:", groupId, page);
      const response = await getProblemsInGroup(groupId, page,cate);
      console.log(response);
      setProblems(response.problems);
      setCurrentPage(parseInt(response.currentPage));
      setTotalPages(response.totalPages);
      setTotalProblems(response.totalProblems);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bài tập:', error);
    }
  };
  const fetchCategories = async () => {
    try {
       const response = await getCategories();
       console.log(response);
       setCategories(response.categories); // Cập nhật danh sách category
       console.log(categories)
    } catch (error) {
       console.error('Error fetching categories:', error);
    }
 };

 const handleOptionCategory = (e) => {
  setSelectedCategory(e.target.value);
  setCurrentPage(1);
};
  const handleViewProblem = (problemId) => {
    navigate(`/problem/${problemId}`);
  };
if (role==="user"){
  return (
    <div className="flex">
      <div className="w-1/4 pr-4">
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

      <div className="w-3/4 pl-4">
        <h2 className="text-xl font-bold mb-4">
          {selectedGroup ? `Bài tập của ${selectedGroup.name}` : 'Chọn một nhóm'}
        </h2>
        {selectedGroup ? (

          <div>

<div className='flex flex-wrap py-4 '>
        <div className='text-center '>
          <label className="my-3 mx-1 block  text-black dark:text-white">
       Phân loại
        </label>
        </div>
   <select
      value={selectedCategory}
      onChange={handleOptionCategory}
      className="mr-2 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg py-2 px-4"
   >
      <option key={0} value={0}>Tất cả Category</option>
      {categories.map((category) => (
         <option key={category.category_id} value={category.category_id}>
            {category.name}
         </option>
      ))}
   </select>
   </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">Id</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Tiêu đề</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Nhóm</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Ngày tạo</th>
                
                <th className="py-4 px-4 font-medium text-black dark:text-white">Độ khó </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Phân loại</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>

                <td className="py-2 px-4 border-b">
                       
                      </td>

              </tr>
                </thead>
                <tbody>
                {problems ? (
                problems.map((row, idx) => (
                  <tr key={idx} className="content-center">
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.problem_id}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.title}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.groups}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{new Date(row.created).toLocaleString()}</td>
                  
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.difficulty}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.categories}</td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <button
                          onClick={() => handleViewProblem(row.problem_id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Xem bài tập
                        </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
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
  );}
  else if(role==='guess') return(<Guess/>)
    else return(<People/>)
};

export default Group;
