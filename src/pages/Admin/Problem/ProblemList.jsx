import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'

import SelectDifficulty from '../../../components/Form/SelectDifficulty';
import { useState, useEffect } from 'react';
import { SimplePagination } from '../../../components/Admin/SimplePagination';
import { getProblemBySearch } from '../../../services/admin/ProblemApi';
import { Table } from '../../../components/TableSetting';
const ProblemList=()=>{
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [input, setInput] = useState('');
    const [numberPage, setNumberPage] = useState(0);
    const [Problems, setProblem] = useState([]);
  
    
    useEffect(() => {
    // localStorage.setItem('currentPage', currentPage);
    // localStorage.setItem('selectedDifficulty', selectedDifficulty);
    // localStorage.setItem('input', input);
      fetchProblems();
    }, [selectedDifficulty, currentPage, input]);
  
    const fetchProblems = async () => {
      try {
        const response = await getProblemBySearch(selectedDifficulty, currentPage, input);
        setProblem(response.problems.problems); // Cập nhật dữ liệu người dùng
        setNumberPage(Math.ceil(response.problems.total_count / 15)); // Cập nhật số trang
        console.log('Number of pages:', numberPage); // Kiểm tra số trang
        console.log(response)
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
  
    const handPageChange = (value) => {
      setCurrentPage(value);
    };
  
    // const handleSubmit = async () => {
    //   await fetchProblems();
    // };
    const deleteRow = async (userId) => {
      try {
        console.log(userId)
        // Gọi API để xóa người dùng
        // await fetch(`/api/Problems/${userId}`, {
        //   method: 'DELETE',
        // });
        // // Cập nhật danh sách người dùng sau khi xóa
        // fetchProblems();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
  
   
    
  
    return (
      <>
        <Breadcrumb pageName='UserList' />
        <div className='flex flex-wrap gap-4 justify-center align-center'>
          <div className="hidden sm:block my-3">
            <div className="relative">
              <button  className="absolute left-0 top-1/2 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
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
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>
  
              <input
                type="text-sm"
                placeholder="Type to search..."
                value={input}
                onChange={handleInputChange}
                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
              />
            </div>
          </div>
          <SelectDifficulty list={['hard', 'medium', 'easy']} name='difficulty' onChange={handleOptionDifficulty} />
        </div>
        <SimplePagination currentPage={currentPage} numberPage={numberPage} onPageChange={handPageChange} />
        <Table rows={Problems} deleteRow={deleteRow}  url1={'/admin/problem/updateproblem/'} url2={'/admin/problem/problemdetail/'} fields={['problem_id', "title",  'groups',"created","username", "difficulty"]} />
      </>
    );
}
export default ProblemList