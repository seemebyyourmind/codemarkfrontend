// Dashboard.jsx
import UserInfo from "../../components/Admin/User/UserInfo";
const Dashboard = () => {
  return (
  
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <UserInfo/>
      <h1 className="text-3xl font-bold text-center mb-8">Cấu trúc thông tin trang web</h1>
      
      {/* Trang User */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Trang User</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li className="font-medium">Tìm kiếm User
            <ul className="list-disc ml-6">
              <li>Tìm kiếm theo số điện thoại, email, username</li>
            </ul>
          </li>
          <li className="font-medium">Xem User
            <ul className="list-disc ml-6">
              <li>Xem thông tin cá nhân</li>
              <li>Đặt lại mật khẩu</li>
              <li>Xem nhóm
                <ul className="list-disc ml-6">
                  <li>Xóa nhóm</li>
                </ul>
              </li>
              <li>Xem bài nộp
                <ul className="list-disc ml-6">
                  <li>Xem chi tiết bài nộp</li>
                  <li>Xóa bài nộp</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="font-medium">Xóa User</li>
        </ul>
      </section>

      {/* Trang Problem */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Trang Problem</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li className="font-medium">Tìm kiếm Problem</li>
          <li className="font-medium">Xem Problem
            <ul className="list-disc ml-6">
              <li>Xem thông tin mô tả</li>
              <li>Xem thông tin code theo ngôn ngữ</li>
              <li>Xem thông tin testcase</li>
              <li>Xem thông tin submit</li>
            </ul>
          </li>
          <li className="font-medium">Xóa Problem</li>
        </ul>
      </section>

      {/* Trang Nhóm */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Trang Nhóm</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li className="font-medium">Tạo nhóm</li>
          <li className="font-medium">Xem nhóm
            <ul className="list-disc ml-6">
              <li>Xem thông tin</li>
              <li>Xem thành viên</li>
              <li>Xem bài tập</li>
            </ul>
          </li>
          <li className="font-medium">Xóa nhóm</li>
        </ul>
      </section>

      {/* Trang Bài nộp */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Trang Bài Nộp</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li className="font-medium">Danh sách bài nộp</li>
          <li className="font-medium">Xem chi tiết bài nộp</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
