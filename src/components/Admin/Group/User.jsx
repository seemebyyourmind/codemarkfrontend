import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUsersInGroup, removeUserFromGroup, getUsersWithGroupStatus, addUserToGroup } from '../../../services/admin/GroupApi';

const GroupUsers = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [popupUsers, setPopupUsers] = useState([]);
  const [popupCurrentPage, setPopupCurrentPage] = useState(1);
  const [popupTotalPages, setPopupTotalPages] = useState(1);
  const [popupTotalUsers, setPopupTotalUsers] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [id, currentPage]);

  
  useEffect(() => {
    fetchPopupUsers();
  }, [popupCurrentPage]);

  

  const fetchUsers = async () => {
    try {
      const response = await getUsersInGroup(id, currentPage);
      setUsers(response.users);
      setCurrentPage(parseInt(response.currentPage));
      setTotalPages(response.totalPages);
      setTotalUsers(response.totalUsers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await removeUserFromGroup(userId, id);
      fetchUsers();
      fetchPopupUsers();
    } catch (error) {
      setError(`Lỗi khi xóa người dùng khỏi nhóm: ${error.message}`);
    }
  };

  const handleAddUser = async (userId) => {
    try {
      await addUserToGroup(userId, id);
      fetchPopupUsers();
      fetchUsers();
    } catch (error) {
      setError(`Lỗi khi thêm người dùng vào nhóm: ${error.message}`);
    }
  };

  const fetchPopupUsers = async () => {
    try {
      const response = await getUsersWithGroupStatus(id, popupCurrentPage, searchKeyword);
      setPopupUsers(response.users);
      setPopupCurrentPage(parseInt(response.currentPage));
      setPopupTotalPages(response.totalPages);
      setPopupTotalUsers(response.totalUsers);
    } catch (error) {
      setError(`Lỗi khi lấy danh sách người dùng: ${error.message}`);
    }
  };

  const handleSearch = () => {
    setPopupCurrentPage(1);
    fetchPopupUsers();
  };

  if (loading) return <div className="text-center mt-8">Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Danh sách người dùng của nhóm</h1>
      <button
        onClick={() => {
          setShowPopup(true);
          fetchPopupUsers();
        }}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
      >
        Thêm người dùng
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Tên người dùng</th>
              <th className="py-2 px-4 border-b text-left">Số điện thoại</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.user_id}</td>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleRemoveUser(user.user_id)}
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

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-1/2 max-h-3/4 overflow-y-auto text-sm">
            <h2 className="text-lg font-bold mb-3">Danh sách người dùng</h2>
            <div className="mb-3 flex">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm kiếm người dùng"
                className="border p-1 mr-2 flex-grow text-sm"
              />
              <button
                onClick={handleSearch}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Tìm kiếm
              </button>
            </div>
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-1 px-2 border-b text-left">ID</th>
                  <th className="py-1 px-2 border-b text-left">Tên người dùng</th>
                  <th className="py-1 px-2 border-b text-left">Số điện thoại</th>
                  <th className="py-1 px-2 border-b text-left">Email</th>
                  <th className="py-1 px-2 border-b text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {popupUsers.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50">
                    <td className="py-1 px-2 border-b">{user.user_id}</td>
                    <td className="py-1 px-2 border-b">{user.username}</td>
                    <td className="py-1 px-2 border-b">{user.phone}</td>
                    <td className="py-1 px-2 border-b">{user.email}</td>
                    <td className="py-1 px-2 border-b">
                      {user.InGroup === 0 ? (
                        <button
                          onClick={() => handleAddUser(user.user_id)}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                        >
                          Thêm vào nhóm
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRemoveUser(user.user_id)}
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
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm">Tổng số người dùng: {popupTotalUsers}</span>
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

export default GroupUsers;
