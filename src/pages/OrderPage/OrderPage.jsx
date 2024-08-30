import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToPetCart,
  removeFromPetCart,
  addToStuffCart,
  removeFromStuffCart,
  updateStuffQuantity,
} from "../../features/cart/cartSlice";
import { updateCart, removeCart } from "../../services/cartApi";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const petItems = useSelector((state) => state.cart.petItems);
  const stuffItems = useSelector((state) => state.cart.stuffItems);
  const dispatch = useDispatch();

  const [money, setMoney] = useState(0);

  // Dùng một useEffect để tự động cập nhật money khi petItems hoặc stuffItems thay đổi
  useEffect(() => {
    // Tính tổng giá trị từ petItems và stuffItems và cập nhật state money
    const totalMoney1 = petItems.reduce(
      (acc, item) => acc + (item.price * (100 - item.discount)) / 100,
      0
    );
    const totalMoney2 = stuffItems.reduce(
      (acc, item) =>
        acc + ((item.price * (100 - item.discount)) / 100) * item.number,
      0
    );
    const totalMoney = totalMoney1 + totalMoney2;
    setMoney(totalMoney);
  }, [petItems, stuffItems]);

  // const handleAddToCart = (product, type) => {
  //   if (type === "pet") {
  //     dispatch(addToPetCart(product));
  //   } else {
  //     dispatch(addToStuffCart(product));
  //   }
  // };

  const handleRemoveFromCart = async (productId, type, user_id) => {
    try {
      if (type === "pet") {
        dispatch(removeFromPetCart(productId));

        console.log(productId, type, user_id);
      } else {
        dispatch(removeFromStuffCart(productId));
      }
      await removeCart(productId, type, user_id);
      console.log(productId, type, user_id);
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseQuantity = async (index, number, user_id, stuff_id) => {
    try {
      if (number > 1) {
        const newQuantity = number - 1;
        dispatch(updateStuffQuantity({ index, newQuantity }));
        console.log(user_id, stuff_id, newQuantity);
        await updateCart(user_id, stuff_id, newQuantity);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const increaseQuantity = async (
    index,
    number,
    stock_quantity,
    user_id,
    stuff_id
  ) => {
    try {
      if (number < stock_quantity) {
        const newQuantity = number + 1;
        dispatch(updateStuffQuantity({ index, newQuantity }));
        console.log(user_id, stuff_id, newQuantity);
        await updateCart(user_id, stuff_id, newQuantity);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div id="shopping-icon" className="flex flex-row ml-7">
        <FaShoppingCart size="80px" color="rgb(249 115 22)" className="" />
        <div className="mx-[40px] h-[80px] w-1 border-sm bg-slate-200"></div>
        <p className="self-center text-4xl"> Giỏ hàng</p>
      </div>

      <div className=" my-3 h-1 w-full border-sm bg-slate-300"></div>

      <hr />

      <div className="flex flex-row my-4">
        <div className="w-2/3 bg-white  mx-2 rounded-2xl">
          <div className="grid grid-cols-7 px-4 py-4">
            <div className="font-bold px-2 col-span-2 border-b-4 py-4">
              Sản phẩm
            </div>
            <div className="font-bold  px-2 border-b-4 py-4">Hình ảnh</div>
            <div className="font-bold px-2 border-b-4 py-4">Đơn giá</div>
            <div className="font-bold  px-2 border-b-4 py-4">Số lượng</div>
            <div className="font-bold  px-2 border-b-4 py-4">Thành tiền</div>
            <div className="font-bold  px-2 border-b-4 py-4">Tùy chọn</div>

            {petItems.map((item, index) => (
              <>
                <div className="py-4 col-span-2 border-b-2 ">{item.name}</div>
                <img
                  src={item.image_1}
                  alt="anh1"
                  className="py-4 border-b-2 rounded-lg"
                ></img>
                <div className="py-4 px-2 border-b-2">
                  {parseFloat(item.price) * (100 - parseFloat(item.discount))} -
                  {item.discount}%
                </div>
                <div className="py-4 px-2 border-b-2">1</div>
                <div className="py-4 px-2 border-b-2">
                  {parseFloat(item.price) * (100 - parseFloat(item.discount))}
                </div>
                <div className="py-4 px-2 text-red-500 cursor-pointer flex flex-row border-b-2">
                  <button
                    onClick={() =>
                      handleRemoveFromCart(item.id, "pet", item.user_id)
                    }
                  >
                    Xóa khỏi giỏ
                  </button>
                </div>
              </>
            ))}

            {stuffItems.map((item, index) => (
              <>
                <div className="py-4 col-span-2 border-b-2"> {item.name}</div>
                <img
                  src={item.image_1}
                  alt="anh1"
                  className="py-4 border-b-2"
                ></img>
                <div className="py-4  px-2 border-b-2">
                  {parseFloat(item.price) * (100 - parseFloat(item.discount))} -
                  {item.discount}%
                </div>

                <div className="py-4  px-2 border-b-2">
                  <button
                    onClick={() => {
                      decreaseQuantity(
                        index,
                        item.number,
                        item.user_id,
                        item.stuff_id
                      );
                    }}
                    className="bg-orange-300 text-white px-2 rounded-md"
                  >
                    -
                  </button>
                  <span className="px-2">{item.number}</span>
                  <button
                    onClick={() => {
                      increaseQuantity(
                        index,
                        item.number,
                        item.stock_quantity,
                        item.user_id,
                        item.stuff_id
                      );
                    }}
                    className="bg-orange-300 text-white px-2 rounded-md"
                  >
                    +
                  </button>
                </div>
                <div className="py-4  px-2 border-b-2">
                  {parseFloat(item.price) *
                    (100 - parseFloat(item.discount)) *
                    parseFloat(item.number)}
                </div>
                <div className="py-4 px-2 text-red-500 cursor-pointer flex flex-row border-b-2">
                  <button
                    onClick={() =>
                      handleRemoveFromCart(item.id, "stuff", item.user_id)
                    }
                  >
                    Xóa khỏi giỏ
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="w-1/3 bg-white rounded-lg ">
          {" "}
          <p className="text-center">Thông tin đặt hàng</p>
          <div className="flex flex-row justify-between ">
            <div className="px-4 py-4">Loại sản phẩm</div>
            <div className="px-4 py-4">
              {petItems.length + stuffItems.length}
            </div>
          </div>
          <div className="flex flex-row justify-between ">
            <div className="px-4 py-4">Thành tiền</div>
            <div className="px-4 py-4">{money}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="px-4 py-4"> Phí giao hàng</div>
            <div className="px-4 py-4">20000</div>
          </div>
          <div className="flex flex-row justify-between border-white border-b-2 mb-3 ">
            <div className="px-4 py-4"> Tổng chi phí</div>
            <div className="px-4 py-4">{money + 20000}</div>
          </div>
          <Link
            to={"/thanhtoan"}
            className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] hover:bg-orange-500"
          >
            <span className="mx-2 rounded-lg">Đặt hàng</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
