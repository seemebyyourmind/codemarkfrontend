import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAuth } from "../../features/auth/authSlice";
import { selectCart } from "../../features/cart/cartSlice";
import { useEffect } from "react";
const CartPopup = () => {
  const { petItems, stuffItems } = useSelector(selectCart);
  const { isLoggedIn } = useSelector(selectAuth);
  const totalItems = petItems.length + stuffItems.length;

  useEffect(() => {
    // Thực hiện các hành động cập nhật liên tục khi giỏ hàng thay đổi
    console.log("Giỏ hàng đã thay đổi:", petItems, stuffItems);
  }, [petItems, stuffItems]); // Chỉ chạy khi giỏ hàng thay đổi
  return (
    <div className="absolute top-full text-black right-0 rounded-lg bg-orange-100 shadow-lg p-4 w-64 text-base">
      {isLoggedIn ? (
        <div className="cart-notification">
          <p>Giỏ hàng: {totalItems} sản phẩm</p>
          <div className="product-list">
            <p>
              <strong>Sản phẩm trong giỏ hàng:</strong>
            </p>
            <ul>
              {petItems.map((item) => (
                <li
                  key={item.id}
                  className="border border-dashed border-orange-400"
                >
                  {item.name} - ${item.price}đ
                </li>
              ))}
              {stuffItems.map((item) => (
                <li
                  className="border border-dashed border-orange-400"
                  key={item.id}
                >
                  {item.name} - {item.price}đ
                </li>
              ))}
            </ul>
          </div>
          {/* Thêm các nút hoặc liên kết để điều hướng đến trang giỏ hàng */}
        </div>
      ) : (
        <div className="p-auto">
          {" "}
          <span>Bạn chưa </span>
          <Link
            to={"/login"}
            className=" bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto  hover:bg-orange-500"
          >
            <span> Đăng nhập</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPopup;
