
import { Link, useLocation } from 'react-router-dom';

const SubNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'border-b-2 border-white' : '';
  };

  return (
    <div className="flex justify-center space-x-4 my-4">
      <Link to="/" className={`px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 ${isActive('/')}`}>
        Trang chủ
      </Link>
      <Link to="/about" className={`px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 ${isActive('/about')}`}>
        Giới thiệu
      </Link>
      <Link to="/group" className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${isActive('/group')}`}>
        Nhóm
      </Link>
      {/* <Link to="/problem" className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${isActive('/problem')}`}>
        Bài tập
      </Link> */}
      <Link to="/submit" className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${isActive('/submit')}`}>
        Nộp bài
      </Link>
    </div>
  );
};

export default SubNav;
