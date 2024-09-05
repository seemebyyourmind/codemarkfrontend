import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupInfo, updateGroup } from '../../../services/admin/GroupApi';

const GroupInfo = () => {
  const { id } = useParams();
  const [groupInfo, setGroupInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGroupInfo();
  }, [id]);

  const fetchGroupInfo = async () => {
    try {
      const data = await getGroupInfo(id);
      setGroupInfo(data);
      setEditedInfo({
        name: data.name,
        description: data.description
      });
    } catch (error) {
      setError(`Lỗi khi lấy thông tin nhóm: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateGroup(id, editedInfo.name, editedInfo.description);
      setGroupInfo(editedInfo);
      setIsEditing(false);
    } catch (error) {
      setError(`Lỗi khi cập nhật thông tin nhóm: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setEditedInfo({
      name: groupInfo.name,
      description: groupInfo.description
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-center mt-8">Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!groupInfo) return <div className="text-center mt-8">Không tìm thấy thông tin nhóm</div>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Thông tin nhóm</h1>
      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Tên nhóm
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={editedInfo.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Mô tả
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={editedInfo.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleSave}
            >
              Lưu
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-2"><strong>Tên nhóm:</strong> {groupInfo.name}</p>
          <p className="mb-4"><strong>Mô tả:</strong> {groupInfo.description}</p>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleEdit}
          >
            Chỉnh sửa thông tin
          </button>
        </div>
      )}
    </div>
  );
};

export default GroupInfo;
