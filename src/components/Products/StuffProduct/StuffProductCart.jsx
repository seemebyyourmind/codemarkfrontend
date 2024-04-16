import { Link } from "react-router-dom";

const StuffProductCard = ({ info }) => {
  return (
    <div className="w-[20rem] h-[26rem] bg-white rounded-[20px]">
      <div className="flex flex-row justify-between mb-4 h-[4rem] ">
        <img
          src="http://res.cloudinary.com/dhwhjdkrr/image/upload/v1706648252/anhchomeo/rhuetr2byhz3nhxjnrvb.png"
          className="w-1/5 h-12"
        ></img>
        <div className="text-center w-3/5">
          <p className=" text-xl font-bold ">Mã S{info.product_id}</p>
          <p>{info.name}</p>
        </div>

        <div className=" w-1/5  h-[3rem] flex text-lg bg-orange-400 font-semibold text-white pl-4  px-2 rounded-l-full  justify-center items-center">
          <p className="text-sm">{`- ${info.discount}%`}</p>
        </div>
      </div>

      {/* Xuống dưới là ảnh, giá tiền và nút xem sản phẩm */}
      <div className="  ">
        <img
          className="w-[15rem] h-[15rem] object-cover mx-auto my-4 rounded-[20px]"
          src={info.image_1}
          alt={`${info} product`}
        />
        <p className=" pb-2 text-center font-semibold">{`Giá: $${info.price}`}</p>
        <Link
          to={`/stuffdetail/${info.product_id}`}
          className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] hover:bg-orange-500"
        >
          Xem sản phẩm
        </Link>
      </div>
    </div>
  );
};

export default StuffProductCard;
