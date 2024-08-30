
// import AdminHeader from "../../components/Admin/AdminHeader";
// import AdminNav from "../../components/Admin/AdminNav";
import { useState } from 'react';
import { useSelector} from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../../components/Admin/Header/index';
import Sidebar from '../../components/Admin/Slidebar/index';
const AdminDashboard = ({ allowedRoles }) => {
  const role = useSelector((state) => state.auth.role);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="dark:bg-boxdark-2 dark:text-bodydark">
    {/* <!-- ===== Page Wrapper Start ===== --> */}
    <div className="flex h-screen overflow-hidden">
      {/* <!-- ===== Sidebar Start ===== --> */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* <!-- ===== Sidebar End ===== --> */}

      {/* <!-- ===== Content Area Start ===== --> */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* <!-- ===== Header Start ===== --> */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Header End ===== --> */}

        {/* <!-- ===== Main Content Start ===== --> */}
        <div id="content" className="">
       {allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/login" />}
      
       </div>
        {/* <!-- ===== Main Content End ===== --> */}
      </div>
      {/* <!-- ===== Content Area End ===== --> */}
    </div>
    {/* <!-- ===== Page Wrapper End ===== --> */}
  </div>

    // <div>
    //   {/* <AdminHeader></AdminHeader> */}
    //   <div className=" flex flex-row bg-gray-50 h-screen px-2">
    //     {/* <AdminNav></AdminNav> */}
    //     <div id="content" className="">
    //     {allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/login" />}
      
    //     </div>
    //   </div>
    // </div>
  );
};
export default AdminDashboard;
