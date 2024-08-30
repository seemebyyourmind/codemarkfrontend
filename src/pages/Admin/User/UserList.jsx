
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import SelectRole from '../../../components/Form/SelectRole'
import { useState, useEffect } from 'react';
import { SimplePagination } from '../../../components/Admin/SimplePagination';
import { getUserByRole } from '../../../services/admin/UserApi';
import { Table } from '../../../components/TableSetting';

const UserList = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [input, setInput] = useState('');
  const [numberPage, setNumberPage] = useState(0);
  const [users, setUser] = useState([]);

  
  useEffect(() => {
  localStorage.setItem('currentPage', currentPage);
  localStorage.setItem('selectedRole', selectedRole);
  localStorage.setItem('input', input);
    fetchUsers();
  }, [selectedRole, currentPage, input]);

  const fetchUsers = async () => {
    try {
      const response = await getUserByRole(selectedRole, currentPage, input);
      setUser(response.users.users); // Cập nhật dữ liệu người dùng
      setNumberPage(Math.ceil(response.users.total_count / 15)); // Cập nhật số trang
      console.log('Number of pages:', numberPage); // Kiểm tra số trang
      console.log(response)
    } catch (error) {
      console.error('Error fetching users:', error);
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

  const handPageChange = (value) => {
    setCurrentPage(value);
  };

  // const handleSubmit = async () => {
  //   await fetchUsers();
  // };
  const deleteRow = async (userId) => {
    try {
      console.log(userId)
      // Gọi API để xóa người dùng
      // await fetch(`/api/users/${userId}`, {
      //   method: 'DELETE',
      // });
      // // Cập nhật danh sách người dùng sau khi xóa
      // fetchUsers();
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
        <SelectRole list={['admin', 'guess', 'user']} name='Role' onChange={handleOptionRole} />
      </div>
      <SimplePagination currentPage={currentPage} numberPage={numberPage} onPageChange={handPageChange} />
      <Table rows={users} deleteRow={deleteRow}  url1={'/admin/user/updateuser/'} url2={'/admin/user/userdetail/'} fields={['user_id', "username", "email", "phone", 'groups', "role_name"]} />
    </>
  );
}

export default UserList;

