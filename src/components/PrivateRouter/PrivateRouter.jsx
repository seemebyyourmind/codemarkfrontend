
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = ({ allowedRoles }) => {
  const role = useSelector((state) => state.auth.role);

  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;