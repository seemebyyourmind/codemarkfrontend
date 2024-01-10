import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
const OrderPage = () => {
  return (
    <div>
      <div id="shopping-icon" className="flex flex-row ml-7">
        <FaShoppingCart size="80px" color="rgb(249 115 22)" className="" />
        <div className="mx-[40px] h-[80px] w-1 border-sm bg-slate-200"></div>
        <p className="self-center text-4xl"> Giỏ hàng (3) </p>
      </div>
      <div className=" my-3 h-1 w-full border-sm bg-slate-300"></div>

      <div className="flex flex-row">
        <div className="w-2/3 bg-white rounded-lg">
          <div className="grid grid-cols-7 px-4 py-4">
            <div className="font-bold col-span-2 border-b-4 py-4">Sản phẩm</div>
            <div className="font-bold border-b-4 py-4">Phân loại</div>
            <div className="font-bold border-b-4 py-4">Đơn giá</div>
            <div className="font-bold border-b-4 py-4">Số lượng</div>
            <div className="font-bold border-b-4 py-4">Thành tiền</div>
            <div className="font-bold border-b-4 py-4">Tùy chọn</div>

            <div className="py-4 col-span-2 border-b-2"> Item 1</div>
            <div className="py-4 border-b-2">Phân loại A</div>
            <div className="py-4 border-b-2">$20.00</div>
            <div className="py-4 border-b-2">2</div>
            <div className="py-4 border-b-2">$40.00</div>
            <div className="py-4 text-red-500 cursor-pointer flex flex-row border-b-2">
              <div>Xóa</div>
              <div>Mua sau</div>
            </div>

            <div className="col-span-2">Item 1</div>
            <div>Phân loại A</div>
            <div>$20.00</div>
            <div>2</div>
            <div>$40.00</div>
            <div className="text-red-500 cursor-pointer">Xóa</div>
          </div>
        </div>
        <div className="w-1/3 bg-orange-100 p-3 text-slate-800 text-center ">
          <div className=" py-2 border-white border-b-2">
            Thông tin đặt hàng
          </div>
          <div className="flex flex-row justify-between ">
            <div className="px-4 py-4">Loại sản phẩm</div>
            <div className="px-4 py-4">1</div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="px-4 py-4">Số sản phẩm</div>
            <div className="px-4 py-4">3</div>
          </div>
          <div className="flex flex-row justify-between ">
            <div className="px-4 py-4">Thành tiền</div>
            <div className="px-4 py-4">222111</div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="px-4 py-4"> Phí giao hàng</div>
            <div className="px-4 py-4">312222</div>
          </div>
          <div className="flex flex-row justify-between border-white border-b-2 mb-3 ">
            <div className="px-4 py-4"> Tổng chi phí</div>
            <div className="px-4 py-4">3000000</div>
          </div>
          <Link
            to={"/thanhtoan"}
            className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] hover:bg-orange-500"
          >
            <span className="mx-2 rounded-lg">Đặt hàng</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default OrderPage;
