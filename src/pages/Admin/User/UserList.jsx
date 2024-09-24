
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import SelectRole from '../../../components/Form/SelectRole'
import { useState, useEffect } from 'react';
import { getUserByRole, deleteUser, getUserRoles, updateUserRole } from '../../../services/admin/UserApi';
import { BsFillTrashFill} from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserList = () => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [input, setInput] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, selectedRole]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUserByRole(selectedRole, currentPage, searchTerm);
      setUsers(response.users.users);
      setCurrentPage(parseInt(response.users.currentPage));
      setTotalPages(response.users.totalPages);
      setTotalUsers(response.users.totalUsers);
     
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await getUserRoles();
      setRoles(response.roles);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách vai trò:', error);
    }
  };

  const handleOptionRole = (value) => {
    setSelectedRole(value);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchTerm(input);
  };

  const deleteRow = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      try {
        await deleteUser(userId);
        fetchUsers();
        alert("Xóa người dùng thành công!");
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error.message);
        alert('Lỗi: ' + error.message);
      }
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      fetchUsers();
    } catch (error) {
      console.error('Lỗi khi cập nhật vai trò người dùng:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 dark:bg-gray-800">
      <Breadcrumb pageName='Danh sách người dùng' />
      <div className='flex flex-col md:flex-row gap-6 justify-between items-center mb-8'>
        <div className="w-full md:w-1/2 flex">
          <div className="relative flex-grow mr-2">
            <input
              type="text"
              placeholder="Nhập thông tin username, phone, email để tìm kiếm"
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
        <SelectRole 
          list={roles.map(role => role.name)} 
          name='Vai trò' 
          onChange={handleOptionRole}
          className="w-full md:w-auto bg-white dark:bg-gray-700 rounded-lg shadow-sm"
        />
      </div>
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        <div className="max-w-full overflow-x-auto table-wrapper">
          <table className="table">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">user_id</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">username</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">email</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">phone</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">groups</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">role_name</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : users && users.length > 0 ? (
                users.map((row) => (
                  <tr key={row.user_id} className="content-center">
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.user_id}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.username}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.email}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.phone}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{row.groups}</td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <select
                        value={roles.find(role => role.role_id === row.role_id)?.name || ''}
                        onChange={(e) => {
                          const selectedRole = roles.find(role => role.name === e.target.value);
                          if (selectedRole) {
                            handleRoleChange(row.user_id, selectedRole.role_id);
                          }
                        }}
                        className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1"
                      >
                        {roles.map((role) => (
                          <option key={role.role_id} value={role.name}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <span className="actions flex grid-cols-2 gap-4">
                        <BsFillTrashFill
                          className="delete-btn cursor-pointer"
                          onClick={() => deleteRow(row.user_id)}
                        />
                          {/* <Link to={`/admin/user/updateuser/${row.user_id}`} className="edit-btn cursor-pointer">
                          <BsFillPencilFill />
                         </Link> */ }  
                        <Link to={`/admin/user/userdetail/${row.user_id}`} className="detail-btn cursor-pointer">
                          <FaEye />
                        </Link>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span>Tổng số người dùng: {totalUsers}</span>
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
}

export default UserList;
