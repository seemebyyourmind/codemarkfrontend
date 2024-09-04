
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import SelectRole from '../../../components/Form/SelectRole'
import { useState, useEffect } from 'react';
import { SimplePagination } from '../../../components/Admin/SimplePagination';
import { getUserByRole,deleteUser } from '../../../services/admin/UserApi';
import { Table } from '../../../components/TableSetting';

const UserList = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState('');
  const [numberPage, setNumberPage] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    localStorage.setItem('selectedRole', selectedRole);
    localStorage.setItem('input', input);
    fetchUsers();
  }, [selectedRole, currentPage, input]);

  const fetchUsers = async () => {
    try {
      const response = await getUserByRole(selectedRole, currentPage, input);
      setUsers(response.users.users);
      setNumberPage(Math.ceil(response.users.total_count / 15));
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    }
  };

  const handleOptionRole = (value) => {
    setSelectedRole(value);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const deleteRow = async (userId) => {
    try {
      const response = await deleteUser(userId);
      console.log('Kết quả xóa người dùng:', response.message);
      // Cập nhật danh sách người dùng sau khi xóa thành công
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 dark:bg-gray-800">
      <Breadcrumb pageName='Danh sách người dùng' />
      <div className='flex flex-col md:flex-row gap-6 justify-between items-center mb-8'>
        <div className="w-full md:w-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm..."
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
        </div>
        <SelectRole 
          list={['admin', 'guess', 'user']} 
          name='Vai trò' 
          onChange={handleOptionRole}
          className="w-full md:w-auto bg-white dark:bg-gray-700 rounded-lg shadow-sm"
        />
      </div>
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        <Table 
          rows={users} 
          deleteRow={deleteRow}  
          url1={'/admin/user/updateuser/'} 
          url2={'/admin/user/userdetail/'} 
          fields={['user_id', "username", "email", "phone", 'groups', "role_name"]} 
        />
      </div>
      <div className="mt-6">
        <SimplePagination 
          currentPage={currentPage} 
          numberPage={numberPage} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
}

export default UserList;
