import brand from "../../assets/petbrand.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useState } from "react";
import UserPopUp from "../Popup/UserPopup";
import CartPopup from "../Popup/CartPopup";
import NotificationPopup from "../Popup/NotificationPopup";
import { selectCart } from "../../features/cart/cartSlice";

import { selectAuth } from "../../features/auth/authSlice";

export default function Navbar() {
  const { petItems, stuffItems } = useSelector(selectCart);
  const totalItems = petItems.length + stuffItems.length;

  const [isNotificationPopupOpen, setNotificationPopupOpen] = useState(false);
  const [isCartPopupOpen, setCartPopupOpen] = useState(false);
  const [isUserPopupOpen, setUserPopupOpen] = useState(false);

  const { isLoggedIn } = useSelector(selectAuth);

  const handleNotificationMouseEnter = () => {
    setNotificationPopupOpen(true);
  };

  const handleNotificationMouseLeave = () => {
    setNotificationPopupOpen(false);
  };

  const handleCartMouseEnter = () => {
    setCartPopupOpen(true);
  };

  const handleCartMouseLeave = () => {
    setCartPopupOpen(false);
  };
  const handleUserMouseEnter = () => {
    setUserPopupOpen(true);
  };

  const handleUserMouseLeave = () => {
    setUserPopupOpen(false);
  };

  return (
    <div className="flex flex-row ">
      <div className="w-1/5 flex flex-row justify-center">
        <img src={brand} />
        <h1 className="self-center">PETHUB.COM</h1>
      </div>

      <div className=" search self-center w-1/2 flex flex-row ">
        <form className="flex items-center w-full mx-3 ">
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
        </form>
      </div>
      <div className="w-[30%] flex flex-row justify-around self-center font-medium">
        {isLoggedIn ? (
          <Link
            to={"/profilepage"}
            onMouseEnter={handleUserMouseEnter}
            onMouseLeave={handleUserMouseLeave}
            className=" relative text-xs flex flex-row items-center  hover:bg-orange-400 hover:text-white px-3 py-1 rounded-md"
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
            {isUserPopupOpen && <UserPopUp />}
          </Link>
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

        <Link
          to="/cart"
          className="relative text-xs hover:bg-orange-400 px-3 py-1 rounded-md hover:text-white"
          onMouseEnter={handleNotificationMouseEnter}
          onMouseLeave={handleNotificationMouseLeave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mx-auto"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clipRule="evenodd"
            />
          </svg>
          Thông báo
          {isNotificationPopupOpen && <NotificationPopup />}
        </Link>

        <Link
          to={"/orderpage"}
          onMouseEnter={handleCartMouseEnter}
          onMouseLeave={handleCartMouseLeave}
          className="text-xs mr-4 relative hover:bg-orange-400 px-3 py-1 rounded-md hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mx-auto"
          >
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
          Giỏ hàng
          <span className="text-lg text-orange-400 hover:text-white ">{`(${totalItems})`}</span>
          {isCartPopupOpen && <CartPopup />}
        </Link>
      </div>
    </div>
  );
}
