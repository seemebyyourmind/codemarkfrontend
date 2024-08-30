import {getInfo} from "../../services/admin/defaultApi"
import { useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineTerminal } from "react-icons/hi";
import { HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineNewspaper } from "react-icons/hi";
const Dashboard = () => {
  const[data,setdata]=useState("");
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const result = await getInfo();

        console.log("Result from API:", result);
      setdata(result);
        // Check the current state of the component
    
      
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-row h-full">
      <div className="w-[280px] h-[200px] m-2  border-4 border-gray-400/50 rounded-lg ">
        <div className="flex flex-row justify-between">
          <div className="m-4">
            <div className="font-bold text-xl">Người dùng</div>
            <div className="text-gray-400"> (toàn bộ) </div>
          </div>
          <div className="m-4">
          <HiOutlineUserGroup className="w-20 h-20 text-green-500" />
            
          </div>
        </div>
        <div className=" m-4 font-bold">
          <span className="font-bold text-2xl">2/5</span>
          <span className=" text-xl text-gray-500"> admin/user</span>
        </div>
      </div>
      <div className="w-[280px] h-[200px] m-2  border-4 border-gray-400/50 rounded-lg ">
        <div className="flex flex-row justify-between">
          <div className="m-4">
            <div className="font-bold text-xl text-gray-600">
               Problem
            </div>
            <div className="text-gray-400"> toàn bộ </div>
          </div>
          <div className="m-4">
          <HiOutlineTerminal className="w-20 h-20 text-red-500"/>
           
          </div>
        </div>
        <div className="m-4 font-bold">
          <span className="font-bold text-2xl">{0} </span>
          <span className=" text-xl text-gray-500"> đơn hàng</span>
        </div>
      </div>
      <div className="w-[280px] h-[200px] m-2  border-4 border-gray-400/50 rounded-lg ">
        <div className="flex flex-row justify-between">
          <div className="m-4">
            <div className="font-bold text-xl"> Bài nộp </div>
            <div className="text-gray-400">trong tháng</div>
          </div>
          <div className="m-4">
          <HiOutlineNewspaper className="w-20 h-20 text-yellow-500" />
          
          </div>
        </div>
        <div className="m-4 font-bold">
          <span className="font-bold text-2xl">{0}</span>
          <span className=" text-xl text-gray-500"> khách hàng</span>
        </div>
      </div>
      <div className="w-[280px] h-[200px] m-2  border-4 border-gray-400/50 rounded-lg ">
        <div className="flex flex-row justify-between">
          <div className="m-4">
            <div className="font-bold text-xl">Kết quả </div>
            <div className="text-gray-400"> trong tháng </div>
          </div>
          <div className="m-4">
          <HiOutlineThumbUp  className="w-20 h-20 text-blue-500"/>
           
          </div>
        </div>
        <div className="m-4 font-bold">
          <span className="font-bold text-2xl">2/5</span>
          <span className=" text-xl text-gray-500"> qua /tổng</span>
         
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
