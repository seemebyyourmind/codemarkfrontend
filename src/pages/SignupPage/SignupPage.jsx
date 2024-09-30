import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ResisterUser } from "../../services/user/authApi";
import dogImg from './dog-img.jpg';
const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && phone && email && password) {
      try {
        const data = await ResisterUser(username, phone, email, password);
        if (data.status === "thành công") {
          setShowPopup(true);
          setSuccessMessage({
            username: data.username,
            phone: data.phone,
            email: data.email
          });
        } else {
          setError("Đăng ký không thành công. Lý do: " + data.message);
        }
      } catch (e) {
        setError(`Có lỗi xảy ra khi đăng ký: ${e.message}`);
      }
    } else {
      setError("Vui lòng điền đầy đủ thông tin.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-orange-100 p-8 rounded-lg shadow-md flex items-center">
        <img className="w-1/2" src={dogImg} alt="ảnh chó" />
        <div className="w-1/2 ml-8">
          <h2 className="text-3xl font-semibold mb-4">Đăng ký</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-orange-300 text-white py-2 px-4 rounded-md hover:bg-orange-500"
            >
              Đăng ký
            </button>
          </form>
          <p className="mt-4">
            Đã có tài khoản? <Link to="/login" className="text-blue-500">Đăng nhập</Link>
          </p>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Đăng ký thành công!</h3>
            <p className="mb-4">Bạn đã đăng ký tài khoản thành công.</p>
            {successMessage && (
              <div className="mb-4">
                <p>Tên đăng nhập: {successMessage.username}</p>
                <p>Số điện thoại: {successMessage.phone}</p>
                <p>Email: {successMessage.email}</p>
              </div>
            )}
            <button
              onClick={handleClosePopup}
              className="w-full bg-orange-300 text-white py-2 px-4 rounded-md hover:bg-orange-500"
            >
              Đến trang đăng nhập
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
