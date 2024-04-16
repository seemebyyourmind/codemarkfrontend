import { Link } from "react-router-dom";
import ImageSlider from "../../images/ImageSlider";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPetById } from "../../../services/productApi";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../../../features/auth/authSlice";
import { selectCart } from "../../../features/cart/cartSlice";

import {
  addToPetCart,
  removeFromPetCart,
  addToStuffCart,
  removeFromStuffCart,
  setCartData,
  updatePetCartOnLoginSuccess,
  updateStuffCartOnLoginSuccess,
  logOutCart,
  updateStuffQuantity,
} from "../../../features/cart/cartSlice";

import { addCart } from "../../../services/cartApi";

const PetProductDetail = () => {
  const [showModel, setShowModel] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { petItems, stuffItems } = useSelector(selectCart);
  const { isLoggedIn, user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const handleAddToCart = async () => {
    // Gọi hành động addToPetCart hoặc addToStuffCart tùy thuộc vào loại sản phẩm
    if (isLoggedIn) {
      const petRedux = { user_id: user.id, pet_id: product.id, ...product };
      dispatch(addToPetCart(petRedux)); // hoặc dispatch(addToStuffCart(product));
      await addCart(user.id, "pet", id);
      console.log(
        "petitem:",
        petItems,
        "stuff:",
        stuffItems,
        "petreduc",
        petRedux
      );
    } else {
      setShowModel(true);
    }
  };

  // Gọi API hoặc lấy dữ liệu sản phẩm từ nguồn khác
  // Ở đây, giả sử có một hàm getProductDetail trả về dữ liệu sản phẩm dựa trên id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPetById(id);

        console.log("Result from API:", result);

        // Check the current state of the component
        console.log("Current product state:", product);
        setProduct(result);
        console.log("Result from API:2", product);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const originalPrice = parseFloat(product.price); // parseFloat để chuyển đổi chuỗi sang số
  const discountPercentage = parseFloat(product.discount);

  // Tính giá sau khi áp dụng chiết khấu
  const discountedPrice = (originalPrice * (100 - discountPercentage)) / 100;
  return (
    <div className=" p-4 bg-orange-100">
      <div className="text-3xl  font-bold py-4">Chi tiết sản phẩm</div>
      <hr className=" h-1 mb-6 mt-1 bg-orange-400" />

      <div className="flex flex-row">
        <div className="image w-1/2 text-center">
          Hình ảnh
          <ImageSlider
            images={[
              product.image_1,
              product.image_2,
              product.image_3,
              product.image_4,
            ]}
          />
        </div>
        <div></div>
        <div className="image w-1/2 text-center ">
          Thông tin chi tiết
          <div className="m-2 bg-slate-300 border-[20px]  rounded-lg text-center ">
            <p className="pb-2 pl-4 pt-4">Tên: {product.name}</p>
            <p className="py-2 pl-4">Loài: {product.color}</p>
            <p className="py-2 pl-4">Giống: {product.color}</p>
            <p className="py-2 pl-4">Màu sắc: {product.color}</p>
            <p className="py-2 pl-4">Cân nặng: {product.weight} kg</p>
            <p className="py-2 pl-4">Độ tuổi:{product.age} </p>
            <p className="py-2 pl-4">Giới tính: {product.sex} </p>
            <p className="py-2 pl-4">
              Triệt sản: {product.trietsan} triệt sản{" "}
            </p>
            <p className="py-2 pl-4">Tiêm phòng: {product.name}</p>

            <p className="pt-2 pb-4 pl-4">
              Mô tả chi tiết:{product.description}
            </p>
          </div>
        </div>
        {showModel && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Content of your modal */}
              <h2 className="text-2xl font-bold mb-4">Bạn chưa đăng nhập</h2>
              {/* Add any other content you want to display in the modal */}

              <Link
                className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] hover:bg-orange-500"
                to={"/login"}
              >
                Đăng nhập ngay
              </Link>
              <h2 className="text-2xl font-bold mb-4">Bạn chưa có tài khoản</h2>

              <Link
                className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] hover:bg-orange-500"
                to={"/signup"}
              >
                Tạo tài khoản
              </Link>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="text-center font-bold text-2xl my-4 text-orange-400 ">
          Giá : {discountedPrice}
          <span className=" pl-2 text-2xl line-through text-center text-gray-500">
            {product.price}
          </span>
          <span className="text-orange-600"> (-{product.discount}%)</span>
        </div>
        <Link
          onClick={handleAddToCart}
          className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] my-4 hover:bg-orange-500"
        >
          <span className="mx-2">Thêm vào giỏ hàng</span>
        </Link>
        <Link className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] my-4 hover:bg-orange-500">
          <span className="mx-2">Mua ngay</span>
        </Link>
      </div>
    </div>
  );
};
export default PetProductDetail;
