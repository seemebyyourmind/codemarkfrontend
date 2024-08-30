import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserGroup } from '../../../services/admin/UserApi';

const Group = () => {
  const { id } = useParams(); // Lấy tham số id từ URL
  const [userGroup, setUserGroup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserGroup(id);
        setUserGroup(user.groups); // Giả sử user.groups là mảng các nhóm
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]); // Chạy effect khi id thay đổi

  if (loading) return <p>Loading...</p>; // Hiển thị thông báo tải dữ liệu
  if (error) return <p>Error: {error.message}</p>; // Hiển thị thông báo lỗi

  return (
    <div>
      <h1>Thông Tin Nhóm</h1>
      {userGroup.length > 0 ? (
        userGroup.map(group => (
          <div key={group.group_id}>
            <p><strong>ID:</strong> {group.group_id}</p>
            <p><strong>Name:</strong> {group.name}</p>
            <p><strong>Description:</strong> {group.description}</p>
          </div>
        ))
      ) : (
        <p>No group information available.</p>
      )}
    </div>
  );
};

export default Group;
