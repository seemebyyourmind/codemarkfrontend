import { Link } from "react-router-dom";
import { FaGooglePlus } from "react-icons/fa";
import { useState } from "react";
import { loginUserAsync } from "../../features/auth/auth";
import { useDispatch } from "react-redux";
// import { login, logout, selectAuth } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../services/cartApi";

import {
  updatePetCartOnLoginSuccess,
  updateStuffCartOnLoginSuccess,
} from "../../features/cart/cartSlice";
const LoginPage = () => {
  const dispatch = useDispatch();
  // const { isLoggedIn, user } = useSelector(selectAuth);
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (e.target.value.length < 8) {
      setPhoneError("Số điện thoại chưa hợp lệ");
    } else {
      setPhoneError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Mật khẩu ít nhất 8 ký tự");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone && phoneError === "" && password && passwordError === "") {
      const result = await dispatch(loginUserAsync(phone, password));
      if (result.status === "sucess") {
        const cartdata = await getCart(result.user.id);
        console.log(cartdata);

        dispatch(updatePetCartOnLoginSuccess(cartdata.pets));
        dispatch(updateStuffCartOnLoginSuccess(cartdata.petProduct));
        navigate("/");
      } else if (result.status === "wrong password") {
        setPasswordError("mật khẩu không đúng");
      } else if (result.status === "phone not exist") {
        setPhoneError("số điện thoại chưa được đăng ký");
      } else {
        alert("có lỗi xảy ra");
      }
    }
  };

  // const login = () => async (dispatch) => {
  //   try {
  //     console.log(phone, password);
  //     // Gửi dữ liệu đăng ký đến server
  //     const response = await fetch("http://localhost:3001/api/user/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ phone, password }),
  //     });
  //     // Xử lý kết quả từ server (nếu cần)
  //     const result = await response.json();
  //     console.log(result.status);
  //     if (result.status === "sucess") {
  //       dispatch(
  //         login({
  //           user: result.user,
  //           access_token: result.access_token,
  //           refresh_token: result.refresh_token,
  //         })
  //       );
  //     } else if (result.status === "wrong password") {
  //       setPasswordError("mật khẩu không đúng");
  //     } else if (result.status === "phone not exist") {
  //       setPhoneError("số điện thoại chưa được đăng ký");
  //     } else {
  //       alert("có lỗi xảy ra");
  //     }
  //     console.log("result", result);
  //   } catch (error) {
  //     console.error("Error registering:", error);
  //   }
  // };
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-orange-100 p-8 rounded-lg shadow-md flex items-center ">
        <img
          className="w-1/2 "
          src="./src/assets/dog-img.jpg"
          alt="hoangpham"
        />
        <div className="w-1/2 ml-8">
          <h2 className="text-3xl font-semibold mb-4">Đăng nhập </h2>
          <form onSubmit={handleSubmit}>
            {/* Your login form goes here */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại
                {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
              </label>
              <input
                type="text"
                id="username"
                name="username"
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
                Mật khẩu:{" "}
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}
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
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe">Nhớ mật khẩu</label>
            <br />
            <button
              type="submit"
              className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto hover:bg-orange-500"
            >
              Đăng nhập ngay
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
              Chưa có tài khoản <Link to={"/signup"}>Đăng ký</Link>
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

              <p className="my-2 font-bold">or</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-24 h-12"
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
    </div>
  );
};
export default LoginPage;
