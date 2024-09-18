// import AdminHeader from "../../components/Admin/AdminHeader";
// import AdminNav from "../../components/Admin/AdminNav";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/Admin/Header/index';
import Sidebar from '../../components/Admin/Slidebar/index';

const AdminDashboard = ({ allowedRoles }) => {
  const role = useSelector((state) => state.auth.role);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Role hiện tại:", role);
    if (role && allowedRoles.includes(role)) {
      console.log("Người dùng có quyền truy cập trang admin");
    } else {
      console.log("Người dùng không có quyền truy cập trang admin");
      navigate('/login');
    }
  }, [role, allowedRoles, navigate]);

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }

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
            <Outlet />
          </div>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default AdminDashboard;
