import { Link } from "react-router-dom";
import ImageSlider from "../../images/ImageSlider";

const StuffProductDetail = () => {
  const images = [
    "./src/assets/pet001/pet1.jpg",
    "./src/assets/pet001/pet2.jpg",
    "./src/assets/pet001/pet3.jpg",
    // Add more image URLs as needed
  ];

  return (
    <div className="w-5/6 p-4 bg-orange-100">
      <div className="text-3xl  font-bold py-4">Chi tiết sản phẩm</div>
      <hr className=" h-1 mb-6 mt-1 bg-orange-400" />

      <div className="flex flex-row">
        <div className="image w-1/2 text-center">
          Hình ảnh
          <ImageSlider images={images} />
        </div>

        <div></div>
        <div className="image w-1/2 text-center ">
          Thông tin sản phẩm
          <div className="m-2 bg-slate-300 text-left rounded-lg">
            <p className="pb-2 pl-4 pt-4">Tên sản phẩm </p>
            <p className="py-2 pl-4">Tùy chọn</p>

            <p className="pt-2 pb-4 pl-4">Mô tả chi tiết</p>
          </div>
        </div>
      </div>

      <div>
        <div className="text-center font-bold text-2xl my-4 text-orange-400 ">
          Giá : 7000000 đ
          <span className=" pl-2 text-2xl line-through text-center text-gray-500">
            10000000đ
          </span>
          <span className="text-orange-600"> (-70%)</span>
        </div>
        <Link className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] my-4 hover:bg-orange-500">
          <span className="mx-2">Thêm vào giỏ hàng</span>
        </Link>
        <Link className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] my-4 hover:bg-orange-500">
          <span className="mx-2">Mua ngay</span>
        </Link>
      </div>
    </div>
  );
};
export default StuffProductDetail;
