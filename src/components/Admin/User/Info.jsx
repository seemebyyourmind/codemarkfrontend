import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { roles } from '../../../assets/ults';
import { getUserInfo, setUserPassword } from '../../../services/admin/UserApi';

const Info = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const user = await getUserInfo(id);
      setUserInfo(user.user[0]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await setUserPassword(id, newPassword);
      alert('Mật khẩu đã được đặt lại thành công!');
      setShowPasswordForm(false);
      setNewPassword('');
    } catch (error) {
      alert('Có lỗi xảy ra khi đặt lại mật khẩu: ' + error.message);
    }
  };

  if (loading) return <p className="text-center text-gray-600 dark:text-gray-400">Đang tải...</p>;
  if (error) return <p className="text-center text-red-600 dark:text-red-400">Lỗi: {error.message}</p>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-2xl mx-auto relative">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Thông Tin Người Dùng</h1>
      {userInfo ? (
        <div className="space-y-4">
          <InfoItem label="ID" value={userInfo.user_id} />
          <InfoItem label="Tên người dùng" value={userInfo.username} />
          <InfoItem label="Số điện thoại" value={userInfo.phone} />
          <InfoItem label="Email" value={userInfo.email} />
          <InfoItem label="Vai trò" value={roles[+userInfo.role_id - 1]} />
          <InfoItem label="Ngày tạo" value={new Date(userInfo.date).toLocaleDateString()} />
          
          <button
            onClick={() => setShowPasswordForm(true)}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Đặt lại mật khẩu
          </button>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">Không có thông tin người dùng.</p>
      )}

      {showPasswordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleResetPassword} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Đặt lại mật khẩu</h2>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
              className="w-full p-2 mb-4 border rounded dark:bg-gray-600 dark:text-white"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 py-2">
    <span className="font-semibold text-gray-700 dark:text-gray-300">{label}:</span>
    <span className="text-gray-600 dark:text-gray-400">{value}</span>
  </div>
);

export default Info;