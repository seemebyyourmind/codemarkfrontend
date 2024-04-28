const Dashboard = () => {
  return (
    <div className="flex flex-row">
      <div className="w-1/4 h-[200px] m-2  border-4 border-gray-400/50 rounded-lg ">
        <div className="flex flex-row justify-between">
          <div className="m-4">
            <div className="font-bold text-2xl">Tổng doanh thu</div>
            <div className="text-gray-400"> trong tháng </div>
          </div>
          <div className="m-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-20 h-20 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
        <div className=" m-4 font-bold">
          <span className="font-bold text-4xl">10</span>
          <span className=" text-2xl text-gray-500"> đ</span>
        </div>
      </div>
      <div className="w-1/4 h-[200px] m-2  border-4 border-gray-400/50 rounded-lg ">
        <div className="flex flex-row justify-between">
          <div className="m-4">
            <div className="font-bold text-2xl text-gray-600">
              Số đơn đặt hàng
            </div>
            <div className="text-gray-400"> trong tháng </div>
          </div>
          <div className="m-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-20 h-20 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
              />
            </svg>
          </div>
        </div>
        <div className="m-4 font-bold">
          <span className="font-bold text-4xl"> 10 </span>
          <span className=" text-2xl text-gray-500"> đơn hàng</span>
        </div>
      </div>
      <div className="w-1/4 h-[200px] m-2  border-4 border-gray-400/50 rounded-lg ">
        <div className="flex flex-row justify-between">
          <div className="m-4">
            <div className="font-bold text-2xl"> Số khách hàng</div>
            <div className="text-gray-400"> </div>
          </div>
          <div className="m-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-20 h-20 text-yellow-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
          </div>
        </div>
        <div className="m-4 font-bold">
          <span className="font-bold text-4xl">10</span>
          <span className=" text-2xl text-gray-500"> khách hàng</span>
        </div>
      </div>
      <div className="w-1/4 h-[200px] m-2  border-4 border-gray-400/50 rounded-lg ">
        <div className="flex flex-row justify-between">
          <div className="m-4">
            <div className="font-bold text-2xl">Số sản phẩm bán</div>
            <div className="text-gray-400"> trong tháng </div>
          </div>
          <div className="m-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-20 h-20 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
              />
            </svg>
          </div>
        </div>
        <div className="m-4 font-bold">
          <span className="font-bold text-4xl"></span>
          <span className=" text-2xl text-gray-500"> sản phẩm</span>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
