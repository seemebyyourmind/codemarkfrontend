import { Link } from 'react-router-dom';

const Introduction = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Chào mừng đến với trang webcode</h2>
        <p className="mb-4">Nhấn vào nút bên dưới để tạo tài khoản</p>
        <Link to="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Tạo tài khoản
        </Link>
      </div>
    </div>
  );
};

export default Introduction;

