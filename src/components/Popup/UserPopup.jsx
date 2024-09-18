import { useSelector, useDispatch } from "react-redux";
// Thay đổi đường dẫn này để phản ánh cấu trúc của dự án của bạn
import { logout } from "../../features/auth/authSlice";

import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
const UserPopUp = () => {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // Thực hiện các hành động cần thiết khi đăng xuất
    dispatch(logout());
  
    navigate("./");
  };
  return (
    <div className="absolute top-full text-black right-0 rounded-lg  bg-orange-100 shadow-lg p-4 w-64 text-base">
      <div>
        <p className="my-2">Xin chào, {user.username}!</p>
        {/* Thêm các thông tin cá nhân khác nếu cần */}
        <Link
          to={"/"}
          className="bg-orange-300 text-white py-2 px-4 rounded-md hover:bg-orange-500"
          onClick={handleLogout}
        >
          Đăng xuất
        </Link>
      </div>
    </div>
  );
};

export default UserPopUp;
