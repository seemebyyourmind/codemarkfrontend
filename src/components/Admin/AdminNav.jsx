const AdminNav = () => {
  return (
    <div className="flex flex-col items-left m-2 w-[20%] bg-white p-4 rounded-[15px]">
      <a
        href="#"
        className="text-gray-500 flex flex-row my-2  hover:bg-gray-300 p-2 rounded-lg"
      >
        <i className="fas fa-chart-bar  w-10 text-4xl mr-4"></i>
        <p className="text-2xl">Dashboard</p>
      </a>

      <a
        href="#"
        className="text-gray-500 flex flex-row my-2  hover:bg-gray-300 p-2 rounded-lg"
      >
        <i className="fas fa-user text-4xl  mr-4  w-10"></i>
        <p className="text-2xl">Quản lý Người dùng</p>
      </a>

      {/* Sản phẩm */}
      <a
        href="#"
        className="text-gray-500 flex flex-row my-2  hover:bg-gray-300 p-2 rounded-lg"
      >
        <i className="fas fa-box text-4xl mr-4 w-10"></i>
        <p className="text-2xl"> Quản lý Sản phẩm</p>
      </a>

      {/* <!-- Đơn hàng --> */}
      <a
        href="#"
        className="text-gray-500 flex flex-row my-2  hover:bg-gray-300 p-2 rounded-lg "
      >
        <i className="fas fa-shopping-cart text-4xl mr-4  w-10"></i>
        <p className="text-2xl">Quản lý Đơn hàng</p>
      </a>

      {/* <!-- Khuyến mãi --> */}
      <a
        href="#"
        className="text-gray-500 flex flex-row my-2  hover:bg-gray-300 p-2 rounded-lg "
      >
        <i className="fas fa-gift text-4xl mr-4  w-10"></i>
        <p className="text-2xl">Quản lý Khuyến mãi</p>
      </a>

      <a
        href="#"
        className="text-gray-500 flex flex-row my-2  hover:bg-gray-300 p-2 rounded-lg "
      >
        <i className="fas fa-cogs text-4xl mr-4  w-10"></i>
        <p className="text-2xl">Cài đặt </p>
      </a>
    </div>
  );
};

export default AdminNav;
