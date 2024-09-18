import { selectAuth, update } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { UpdateUserInfo, ChangePassword } from "../../services/user/authApi";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const [message, setMessage] = useState("");
  const [updateInfoMessage, setUpdateInfoMessage] = useState("");
  const [changePasswordMessage, setChangePasswordMessage] = useState("");

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    phone: user.phone || "",
    email: user.email || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      await UpdateUserInfo(user.user_id, formData.phone, formData.email);
      dispatch(update({ user: { phone: formData.phone, email: formData.email } }));
      setUpdateInfoMessage("Cập nhật thông tin thành công!");
      setMessage("Cập nhật thông tin thành công!");
      setTimeout(() => {
        setShowUpdateForm(false);
        setUpdateInfoMessage("");
      }, 2000);
    } catch (error) {
      setUpdateInfoMessage("Lỗi khi cập nhật thông tin: " + error.message);
      setMessage("Lỗi khi cập nhật thông tin: " + error.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setChangePasswordMessage("Mật khẩu mới không khớp!");
      return;
    }
    try {
      await ChangePassword(user.user_id, formData.currentPassword, formData.newPassword);
      setChangePasswordMessage("Đổi mật khẩu thành công!");
      setMessage("Đổi mật khẩu thành công!");
      setFormData({ ...formData, currentPassword: "", newPassword: "", confirmNewPassword: "" });
      setTimeout(() => {
        setShowPasswordForm(false);
        setChangePasswordMessage("");
      }, 2000);
    } catch (error) {
      setChangePasswordMessage("Lỗi khi đổi mật khẩu: " + error.message);
      setMessage("Lỗi khi đổi mật khẩu: " + error.message);
    }
  };

  return (
    <div className="bg-orange-100 p-6 text-slate-800 relative">
      <h2 className="text-2xl font-bold mb-4 text-center">Thông tin cá nhân</h2>
      
      <div className="mb-4">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Số điện thoại:</strong> {user.phone || "Chưa có thông tin"}</p>
        <p><strong>Email:</strong> {user.email || "Chưa có thông tin"}</p>
      </div>

      <div className="flex flex-col items-center mt-4 space-y-2">
        <button
          onClick={() => setShowUpdateForm(!showUpdateForm)}
          className="bg-orange-300 text-white py-2 px-4 rounded-md w-[250px] hover:bg-orange-500"
        >
          {showUpdateForm ? "Ẩn form cập nhật" : "Cập nhật thông tin"}
        </button>
        <button
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className="bg-orange-300 text-white py-2 px-4 rounded-md w-[250px] hover:bg-orange-500"
        >
          {showPasswordForm ? "Ẩn form đổi mật khẩu" : "Đổi mật khẩu"}
        </button>
      </div>

      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Cập nhật thông tin</h3>
            <form onSubmit={handleUpdateInfo}>
              <div className="mb-4">
                <label className="block mb-2">Số điện thoại:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border rounded" />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowUpdateForm(false)} className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400">
                  Hủy
                </button>
                <button type="submit" className="bg-orange-300 text-white py-2 px-4 rounded-md hover:bg-orange-500">
                  Xác nhận cập nhật
                </button>
              </div>
            </form>
            {updateInfoMessage && <div className="mt-4 text-green-600 text-center">{updateInfoMessage}</div>}
          </div>
        </div>
      )}

      {showPasswordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Đổi mật khẩu</h3>
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label className="block mb-2">Mật khẩu hiện tại:</label>
                <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleInputChange} className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Mật khẩu mới:</label>
                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleInputChange} className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Xác nhận mật khẩu mới:</label>
                <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleInputChange} className="w-full p-2 border rounded" />
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowPasswordForm(false)} className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400">
                  Hủy
                </button>
                <button type="submit" className="bg-orange-300 text-white py-2 px-4 rounded-md hover:bg-orange-500">
                  Xác nhận đổi mật khẩu
                </button>
              </div>
            </form>
            {changePasswordMessage && <div className="mt-4 text-green-600 text-center">{changePasswordMessage}</div>}
          </div>
        </div>
      )}

      {message && <div className="mt-4 text-green-600 text-center">{message}</div>}
    </div>
  );
};

export default Profile;
