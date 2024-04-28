import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
const AdminHeader = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = date + "/" + month + "/" + year;

  return (
    <div className="flex flex-row my-4  mx-auto justify-between w-[80%]">
      <a className=" " href="./admin">
        <span className="  text  opacity-50 round-lg text-4xl font-bold">
          Admin
        </span>
      </a>
      <div className="flex ">
        <div className="flex items-center bg-gray-100 p-2 opacity-50 round-lg ">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className=" w-[400px] border border-gray-300 p-2 rounded-l-md focus:outline-none focus:border-gray-600"
          />
          <button className=" text-black px-4 py-2 border border-gray-300 rounded-r-md hover:bg-gray-200 hover:border-gray-800 focus:outline-none">
            <CiSearch />
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="bg-gray-100 p-2 mx-4 opacity-50 text-2xl ring-2 ring-blue-500 font-semibold rounded-[15px]">
          {currentDate}
        </div>
        <div className="text-white mx-4 ">
          <CiBellOn className="fas fa-bell text-red-400 text-4xl hover:text-red-300"></CiBellOn>
        </div>

        <div className="text-white mx-4  ">
          <FaRegUser className="fas fa-user text-blue-400 hover:text-blue-300 text-4xl"></FaRegUser>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
