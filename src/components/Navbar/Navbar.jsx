import brand from "../../assets/petbrand.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// Thay đổi đường dẫn này để phản ánh cấu trúc của dự án của bạn
import { logout } from "../../features/auth/authSlice";


import { useNavigate } from "react-router-dom";



// import CartPopup from "../Popup/CartPopup";
// import NotificationPopup from "../Popup/NotificationPopup";
// import { selectCart } from "../../features/cart/cartSlice";

import { selectAuth } from "../../features/auth/authSlice";

export default function Navbar() {
  // const { petItems, stuffItems } = useSelector(selectCart);
  // const totalItems = petItems.length + stuffItems.length;

  // const [isNotificationPopupOpen, setNotificationPopupOpen] = useState(false);
  // const [isCartPopupOpen, setCartPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(selectAuth);

  // const handleNotificationMouseEnter = () => {
  //   setNotificationPopupOpen(true);
  // };

  // const handleNotificationMouseLeave = () => {
  //   setNotificationPopupOpen(false);
  // };

  // const handleCartMouseEnter = () => {
  //   setCartPopupOpen(true);
  // };

  // const handleCartMouseLeave = () => {
  //   setCartPopupOpen(false);
  // };
  const handleLogout = () => {
    // Thực hiện các hành động cần thiết khi đăng xuất
    dispatch(logout());
  
    navigate("./");
  };

  return (
    <div className="flex flex-row ">
      <div className="w-1/5 flex flex-row justify-center">
        <img src={brand} />
        <h1 className="self-center">Code HUB</h1>
      </div>

      <div className=" search self-center w-1/2 flex flex-row ">
        {/* <form className="flex items-center w-full mx-3 ">
          <label htmlFor="search-dropdown" className="sr-only">
            Search
          </label>
          <div className="relative">
            <select
              id="search-dropdown"
              className="block appearance-none w-40 bg-orange-200 border border-orange-300 rounded-l-md py-2 px-4 pr-8 focus:outline-none  focus:ring-orange-400 focus:border-orange-400"
            >
              <option className="">Tất cả</option>
              <option>Cho chó</option>
              <option>Cho mèo</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM2 10a8 8 0 1 0 16 0 8 8 0 0 0-16 0z" />
              </svg>
            </div>
          </div>
          <input
            type="search"
            id="search-input"
            placeholder="Tìm kiếm sản phẩm"
            className="block w-full border border-orange-300 rounded-r-md py-2 px-4 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <button
            type="submit"
            className="  flex flex-row self-center text-base bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 ml-2 px-4 w-32 rounded-md focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 fill-current mt-1"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>{" "}
            <h3 className="pl-2">Tìm</h3>
          </button>
        </form> */}
      </div>
      <div className="w-[30%] flex flex-row justify-around self-center font-medium">
        {isLoggedIn ? (
          <div className="flex flex-row items-center">
            <Link
              to={"/profile"}
              className="relative text-xs flex flex-row items-center  hover:bg-orange-400 hover:text-white px-3 py-1 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mx-auto"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
              Cá nhân
            </Link>
            <Link
          to={"/"}
         className="relative text-xs flex flex-row items-center  hover:bg-orange-400 hover:text-white px-3 py-1 rounded-md"
          onClick={handleLogout}
        >
          Đăng xuất
        </Link>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="text-xs flex flex-row items-center  hover:bg-orange-400 hover:text-white px-3 py-1 rounded-md"
          >
            <div className="flex flex-col">
              {" "}
              <span>Đăng nhập</span>
              <span>Đăng ký</span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mx-auto"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}
