import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminNav from "../../components/Admin/AdminNav";

const AdminDashboard = () => {
  return (
    <div>
      <AdminHeader></AdminHeader>
      <div className=" flex flex-row bg-gray-50 h-screen px-2">
        <AdminNav></AdminNav>
        <div id="content" className="w-[80%]">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
