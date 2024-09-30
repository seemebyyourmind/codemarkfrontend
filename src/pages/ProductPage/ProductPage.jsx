import { Outlet } from "react-router-dom";
import Banner from "../../components//Banner/Banner";
import Image from "../../assets/react.svg"
const IntroductionPage = () => {
  // const codePlatformImageUrl = "src/assets/react.svg"; // Đường dẫn ảnh giới thiệu về CodeHub
  const platformDescription =
    "CodeHub là nền tảng học lập trình trực tuyến hiện đại, cung cấp các bài tập lập trình phong phú, hỗ trợ nhiều ngôn ngữ như Python, C++, và JavaScript. Với giao diện thân thiện và tính năng kiểm tra code tự động, CodeHub giúp bạn rèn luyện kỹ năng lập trình hiệu quả và nhanh chóng.";

  return (
    <div>
      {/* Banner giới thiệu nền tảng */}
      <Banner
        imageUrl={Image}
        description={platformDescription}
      />

      {/* Nội dung chính của trang giới thiệu */}
      <div className="flex flex-col mt-8 items-center justify-center">
        {/* Tiêu đề */}
        <h1 className="text-4xl font-bold mb-4 text-center">Giới thiệu về CodeHub</h1>

        {/* Đoạn văn giới thiệu */}
        <p className="text-lg text-gray-700 max-w-4xl text-center leading-relaxed">
          CodeHub là điểm đến lý tưởng cho những ai đam mê học lập trình. Dù bạn là người mới bắt đầu hay một lập trình viên có kinh nghiệm, CodeHub luôn cung cấp các bài tập thử thách phù hợp với mọi cấp độ. 
          Hệ thống chấm điểm tự động giúp bạn nhanh chóng phát hiện lỗi và cải thiện khả năng lập trình của mình. Hơn nữa, với các bài hướng dẫn chi tiết, bạn sẽ luôn có tài nguyên cần thiết để học hỏi và phát triển.
        </p>

        {/* Thêm một nút Call to Action */}
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all">
            Bắt đầu ngay
          </button>
        </div>
      </div>

      <div className="flex flex-row mt-8">
        {/* Outlet để thêm các phần nội dung khác nếu cần */}
        <Outlet />
      </div>
    </div>
  );
};

export default IntroductionPage;


