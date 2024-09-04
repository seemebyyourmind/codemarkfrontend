import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserGroup, deleteUserFromGroup } from '../../../services/admin/UserApi';

const Group = () => {
  const { id } = useParams();
  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserGroups();
  }, [id]);

  const fetchUserGroups = async () => {
    try {
      const response = await getUserGroup(id);
      setUserGroups(response.groups);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteUserFromGroup(id, groupId);
      fetchUserGroups();
    } catch (error) {
      console.error('Lỗi khi xóa nhóm:', error);
    }
  };

  if (loading) return <p className="text-center text-gray-600 dark:text-gray-400">Đang tải...</p>;
  if (error) return <p className="text-center text-red-600 dark:text-red-400">Lỗi: {error.message}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Thông Tin Nhóm</h1>
      {userGroups.length > 0 ? (
        <div className="space-y-4">
          {userGroups.map(group => (
            <div key={group.group_id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">ID: {group.group_id}</p>
                <p className="text-gray-600 dark:text-gray-300">Tên: {group.name}</p>
                <p className="text-gray-600 dark:text-gray-300">Mô tả: {group.description}</p>
              </div>
              <button
                onClick={() => handleDeleteGroup(group.group_id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Không có thông tin nhóm.</p>
      )}
    </div>
  );
};

export default Group;
