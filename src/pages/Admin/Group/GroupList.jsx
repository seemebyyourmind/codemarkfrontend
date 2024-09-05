import { useState, useEffect } from 'react';
import { getGroups, deleteGroup, createGroup } from '../../../services/admin/GroupApi';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';
import { FaEye, FaTrash, FaPlus } from 'react-icons/fa';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGroups, setTotalGroups] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  useEffect(() => {
    fetchGroups();
  }, [currentPage]);

  const fetchGroups = async () => {
    try {
      const data = await getGroups(currentPage);
      setGroups(data.groups);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalGroups(data.totalGroups);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhóm:', error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhóm này?')) {
      try {
        await deleteGroup(groupId);
        fetchGroups(); // Cập nhật lại danh sách sau khi xóa
      } catch (error) {
        console.error('Lỗi khi xóa nhóm:', error);
      }
    }
  };

  const handleCreateGroup = async () => {
    try {
      await createGroup(newGroupName, newGroupDescription);
      setShowPopup(false);
      setNewGroupName('');
      setNewGroupDescription('');
      fetchGroups(); // Cập nhật lại danh sách sau khi tạo
    } catch (error) {
      console.error('Lỗi khi tạo nhóm mới:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName='Danh sách nhóm' />
      <div className="bg-white dark:bg-boxdark p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Danh sách nhóm</h2>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Tạo nhóm mới
          </button>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white">ID</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Tên nhóm</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Mô tả</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Số người dùng</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Số bài tập</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Tổng số lần nộp bài</th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.group_id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{group.group_id}</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{group.name}</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{group.description}</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{group.total_users}</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{group.total_problems}</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">{group.total_submits}</td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center justify-center space-x-3">
                      <Link 
                        to={`/admin/group/detail/${group.group_id}`} 
                        className="text-primary hover:text-primary-dark transition-colors duration-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FaEye size={20} />
                      </Link>
                      <button 
                        onClick={() => handleDeleteGroup(group.group_id)} 
                        className="text-red-500 hover:text-red-700 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span>Tổng số nhóm: {totalGroups}</span>
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
          <div className="bg-white dark:bg-boxdark p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Tạo nhóm mới</h3>
            <input
              type="text"
              placeholder="Tên nhóm"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <textarea
              placeholder="Mô tả nhóm"
              value={newGroupDescription}
              onChange={(e) => setNewGroupDescription(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 mr-2 bg-gray-300 text-black rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateGroup}
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Tạo nhóm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupList;
