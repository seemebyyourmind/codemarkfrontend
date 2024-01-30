import { Link } from "react-router-dom";
import { FaGooglePlus } from "react-icons/fa";
import { useState } from "react";
import { SignUpApi } from "../../services/userApi";
const SignupPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const [phoneMatchError, setPhoneMatchError] = useState("");

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (e.target.value.length < 8) {
      setPhoneMatchError("Số điện thoại chưa hợp lệ");
    } else {
      setPhoneMatchError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Mật khẩu ít nhất 8 ký tự");
    } else {
      setPasswordError("");
    }
    checkPasswordMatch(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPasswordMatch(password, e.target.value);
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setPasswordMatchError("Mật khẩu không khớp");
    } else {
      setPasswordMatchError("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      phone &&
      passwordMatchError === "" &&
      password &&
      passwordError === "" &&
      phoneMatchError === ""
    ) {
      await register();
    }
    // Gọi hàm xử lý đăng ký
  };

  const register = async () => {
    try {
      const result = await SignUpApi(phone, password);

      if (result.status === "success") {
        handleOpenModal();
      } else setPhoneMatchError("Số điện thoại đã được sử dụng");
      console.log("result", result);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-orange-100 p-8 rounded-lg shadow-md flex items-center ">
        <img className="w-1/2 " src="./src/assets/dog-img.jpg" alt="ảnh chó" />
        <div className="w-1/2 ml-8">
          <h2 className="text-3xl font-semibold mb-4">Đăng ký</h2>
          <form onSubmit={handleSubmit}>
            {/* Your login form goes here */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại:{" "}
                {phoneMatchError && (
                  <p style={{ color: "red" }}>{phoneMatchError}</p>
                )}
              </label>
              {/* {phoneMatchError && (
                <p style={{ color: "red" }}>{phoneMatchError}</p>
              )} */}
              <input
                type="text"
                id="username"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Số điện thoại"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mật khẩu :
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}
              </label>

              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Nhập lại mật khẩu:
              </label>

              <input
                type="password"
                id="retypepassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                name="retypepassword"
                placeholder=" Nhập lại mật khẩu"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            {passwordMatchError && (
              <p style={{ color: "red" }}>{passwordMatchError}</p>
            )}
            <br />
            <button
              type="submit"
              className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto hover:bg-orange-500"
            >
              Tạo tài khoản
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <p>
              Đã có tài khoản. <Link to={"/login"}>Đăng nhập</Link>
            </p>
            <div className="flex flex-row justify-around ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>

              <p className="my-2 font-bold">hoặc</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </div>
          </form>
          <Link
            to={"/googlelogin"}
            className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] hover:bg-orange-500"
          >
            <span className="mx-2">Đăng nhập với GOOGLE</span>
            <FaGooglePlus className=" w-8 h-8" />
          </Link>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Content of your modal */}
            <h2 className="text-2xl font-bold mb-4">Đăng ký thành công!</h2>
            {/* Add any other content you want to display in the modal */}

            <Link
              className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] hover:bg-orange-500"
              to={"/login"}
            >
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignupPage;
