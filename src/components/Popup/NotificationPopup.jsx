import { useSelector } from "react-redux";

import { selectAuth } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
const NotificationPopup = () => {
  const { isLoggedIn } = useSelector(selectAuth);
  return (
    <div className="absolute top-full text-black right-0 rounded-lg  bg-orange-100 shadow-lg p-4 w-64 text-base">
      {isLoggedIn ? (
        <span>Đơn xin duyêt thú cưng cửa bạn được chấp nhận.</span>
      ) : (
        <div className="p-auto">
          {" "}
          <span>Bạn chưa </span>
          <Link
            to={"/login"}
            className=" bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto  hover:bg-orange-500"
          >
            <span> Đăng nhập</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
