import { useState, useEffect } from 'react';
import { getUsersInfo } from '../../../services/admin/UserApi'; // Đảm bảo đường dẫn đúng

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({ userCount: 0, groupCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch dữ liệu từ API sử dụng getUserInfo
    const fetchUserInfo = async () => {
      try {
        const data = await getUsersInfo();
        
        // Xử lý dữ liệu từ API
        const userCount = data.users.length > 0 ? data.users[0].users : 0;
        const groupCount = data.groups.length > 0 ? data.groups[0].groups : 0;

        setUserInfo({
          userCount,
          groupCount,
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex justify-around p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <div className="text-center">
        <h2 className="text-xl font-bold">Users</h2>
        <p className="text-lg">{userInfo.userCount}</p>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold">Groups</h2>
        <p className="text-lg">{userInfo.groupCount}</p>
      </div>
    </div>
  );
};

export default UserInfo;
