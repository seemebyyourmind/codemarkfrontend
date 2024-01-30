import { Outlet, Link } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";
const ProfilePage = () => {
  return (
    <div className="m-12">
      <div id="shopping-icon" className="flex flex-row ml-7">
        <FaHouseUser size="80px" color="rgb(249 115 22)" className="" />
        <div className="mx-[40px] h-[80px] w-1 border-sm bg-slate-200"></div>
        <p className="self-center text-4xl"> Cá nhân </p>
      </div>
      <div className=" my-3 h-1 w-full border-sm bg-slate-300"></div>

      <div className="flex">
        <div className="w-1/4 p-4 flex flex-col">
          <Link
            className=" py-2 my-2 text-center font-medium rounded-lg text-white text-base bg-orange-300 hover:bg-orange-500"
            to={"profile"}
          >
            Thông tin cá nhân
          </Link>
          <Link
            className="  py-2 my-2 text-center font-medium rounded-lg text-white text-base bg-orange-300 hover:bg-orange-500"
            to={"order"}
          >
            {" "}
            Danh sách đặt hàng
          </Link>
          <Link
            className="  py-2 my-2 text-center font-medium rounded-lg text-white text-base bg-orange-300 hover:bg-orange-500"
            to={"petadopt"}
          >
            Danh sách thú bỏ rơi
          </Link>
          <Link
            className=" py-2 my-2 text-center font-medium rounded-lg text-white text-base bg-orange-300 hover:bg-orange-500"
            to={"petrequire"}
          >
            Danh sách xin nhận nuôi
          </Link>
        </div>
        <div className="w-3/4 p-4">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
