import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { LoginUser } from "../../services/user/authApi";
import { login } from "../../features/auth/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const data = await LoginUser(username, password);
        if (data.status === "success") {
          dispatch(login(data.user));
          setSuccessMessage(`Đăng nhập thành công! Xin chào ${data.user.username}`);
          setTimeout(() => {
            if (data.user.role_name === "admin") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          }, 2000);
        } else {
          setError("Tên đăng nhập hoặc mật khẩu không đúng");
        }
      } catch (e) {
        setError(`Có lỗi xảy ra khi đăng nhập: ${e.message}`);
      }
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-orange-100 p-8 rounded-lg shadow-md flex items-center">
        <img
          className="w-1/2"
          src="./src/assets/dog-img.jpg"
          alt="hoangpham"
        />
        <div className="w-1/2 ml-8">
          <h2 className="text-3xl font-semibold mb-4">Đăng nhập</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Tên đăng nhập"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <button
              type="submit"
              className="w-full bg-orange-300 text-white py-2 px-4 rounded-md hover:bg-orange-500 mb-4"
            >
              Đăng nhập
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600 mb-2">Chưa có tài khoản?</p>
            <Link
              to="/signup"
              className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
