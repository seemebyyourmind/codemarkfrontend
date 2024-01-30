import { login, logout, selectAuth } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Profile = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(selectAuth);
  return (
    <div className=" bg-orange-100 p-3 text-slate-800 text-center ">
      <div className=" py-2 border-white border-b-2">Thông tin cá nhân:</div>
      <div className="flex flex-row justify-between ">
        <div className="px-4 py-4">Username:</div>
        <div className="px-4 py-4">{user.username || "Chưa có thông tin"}</div>
      </div>

      <div className="flex flex-row justify-between ">
        <div className="px-4 py-4">Họ và tên: </div>
        <div className="px-4 py-4">{user.full_name || "Chưa có thông tin"}</div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="px-4 py-4">Địa chỉ giao hàng:</div>
        <div className="px-4 py-4">{user.address || "Chưa có thông tin"}</div>
      </div>
      <div className="flex flex-row justify-between  ">
        <div className="px-4 py-4"> Số điện thoại:</div>
        <div className="px-4 py-4">{user.phone || "Chưa có thông tin"}</div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="px-4 py-4">Email:</div>
        <div className="px-4 py-4">{user.email || "Chưa có thông tin"}</div>
      </div>
      <Link
        to={"../updateprofile"}
        className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] hover:bg-orange-500"
      >
        <span className="mx-2 rounded-lg">Chỉnh sửa thông tin</span>
      </Link>
    </div>
  );
};

export default Profile;
