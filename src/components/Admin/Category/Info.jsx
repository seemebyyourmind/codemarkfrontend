import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryInfo, updateCategory } from '../../../services/admin/CategoryApi';

const CategoryInfo = () => {
  const { id } = useParams();
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategoryInfo();
  }, [id]);

  const fetchCategoryInfo = async () => {
    try {
      const data = await getCategoryInfo(id);
      setCategoryInfo(data);
      setEditedInfo({
        name: data.name,
        description: data.description
      });
    } catch (error) {
      setError(`Lỗi khi lấy thông tin danh mục: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateCategory(id, editedInfo.name, editedInfo.description);
      setCategoryInfo(editedInfo);
      setIsEditing(false);
    } catch (error) {
      setError(`Lỗi khi cập nhật thông tin danh mục: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setEditedInfo({
      name: categoryInfo.name,
      description: categoryInfo.description
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-center mt-8">Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!categoryInfo) return <div className="text-center mt-8">Không tìm thấy thông tin danh mục</div>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Thông tin danh mục</h1>
      {isEditing ? (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Tên danh mục
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
          <p className="mb-2"><strong>Tên danh mục:</strong> {categoryInfo.name}</p>
          <p className="mb-4"><strong>Mô tả:</strong> {categoryInfo.description}</p>
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

export default CategoryInfo;
