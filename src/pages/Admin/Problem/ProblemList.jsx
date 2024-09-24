import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'

import SelectDifficulty from '../../../components/Form/SelectDifficulty';
import { useState, useEffect } from 'react';

import { getProblemBySearch,deleteProblem } from '../../../services/admin/ProblemApi';
import { BsFillTrashFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
const ProblemList=()=>{
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
  
    const [input, setInput] = useState('');
    const [Problems, setProblem] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProblems, setTotalProblems] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
    // localStorage.setItem('currentPage', currentPage);
    // localStorage.setItem('selectedDifficulty', selectedDifficulty);
    // localStorage.setItem('input', input);
      fetchProblems();
    }, [selectedDifficulty, currentPage, searchTerm]);
  
    const fetchProblems = async () => {
      try {
        const response = await getProblemBySearch(selectedDifficulty, currentPage, input);
        setProblem(response.problems.problems); // Cập nhật dữ liệu người dùng
        setCurrentPage(parseInt(response.problems.currentPage)); // Cập nhật trang hiện tại
        
        setTotalPages(response.problems.totalPages);
        setTotalProblems(response.problems.totalProblems);
       
        console.log( "response problem",response);
      } catch (error) {
        console.error('Error fetching Problems:', error);
      }
    };
  
    const handleOptionDifficulty = (value) => {
      setSelectedDifficulty(value);
      setCurrentPage(1);
    };
  
    const handleInputChange = (e) => {
      setInput(e.target.value);
      setCurrentPage(1);
    };
  
    const handleSearch = () => {
      setCurrentPage(1);
      setSearchTerm(input);
    };
  
    // const handleSubmit = async () => {
    //   await fetchProblems();
    // };
    const deleteRow = async (problemId) => {
      try {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài toán này không?")) {
          console.log(problemId)
          // Gọi API để xóa bài toán
          await deleteProblem(problemId);
          // Cập nhật danh sách bài toán sau khi xóa
          fetchProblems();
        }
      } catch (error) {
        console.error('Lỗi khi xóa bài toán:', error);
      }
    };
  
   
    
  
    return (
      <>
        <Breadcrumb pageName='Danh sách problems' />
        <div className='flex flex-col md:flex-row gap-6 justify-between items-center mb-8'>
        <div className="w-full md:w-1/2 flex">
          <div className="relative flex-grow mr-2">
            <input
              type="text"
              placeholder="Nhập thông tin tiêu đề hoặc miêu tả bài toán"
              value={input}
              onChange={handleInputChange}
              className="w-full bg-white dark:bg-gray-700 pl-10 pr-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Tìm kiếm
          </button>
        </div>
        <SelectDifficulty list={['hard', 'medium', 'easy']} name='difficulty' onChange={handleOptionDifficulty} />
      </div>
        
       
        <div className="max-w-full overflow-x-auto table-wrapper">
          <table className="table">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">Id</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Tiêu đề</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Nhóm</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Ngày tạo</th>
                
                <th className="py-4 px-4 font-medium text-black dark:text-white">Độ khó </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Phân loại</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
            {Problems ? (
                Problems.map((row, idx) => (
                  <tr key={idx} className="content-center">
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.problem_id}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.title}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.groups}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{new Date(row.created).toLocaleString()}</td>
                  
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.difficulty}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.categories}</td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <span className="actions flex grid-cols-2 gap-4">
                        <BsFillTrashFill
                          className="delete-btn cursor-pointer"
                          onClick={() => deleteRow(row.problem_id)}
                        />
                        {/* <Link to={`/admin/problem/updateproblem/${row.problem_id}`} className="edit-btn cursor-pointer">
                          <BsFillPencilFill />
                        </Link> */}
                        <Link to={`/admin/problem/problemdetail/${row.problem_id}`} className="detail-btn cursor-pointer">
                          <FaEye />
                        </Link>
                      </span>
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
        <span>Tổng số người dùng: {totalProblems}</span>
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
      </>
    );
}
export default ProblemList