import { Link } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";

const PetProductCard = ({
  type,
  breed,
  sex,
  code,
  discount,
  imageUrl,
  price,
}) => {
  return (
    <div className="w-[20rem] h-[26rem] bg-white rounded-[20px]">
      <div className="flex flex-row justify-between mb-4 ">
        {type === "dog" ? (
          <FaDog color="rgb(251 191 36)" className="h-12 w-12" />
        ) : (
          <FaCat color="rgb(251 191 36)" className="h-12 w-12" />
        )}
        <div className="text-center">
          <p className=" text-xl font-bold ">Mã {code}</p>
          <p>
            Giống {breed} {sex}
          </p>
        </div>

        <p className="text-lg bg-orange-400 font-semibold text-white pl-4  px-2 rounded-l-full">{`- ${discount}%`}</p>
      </div>

      {/* Xuống dưới là ảnh, giá tiền và nút xem sản phẩm */}
      <div className="  ">
        <img
          className="w-[15rem] h-[15rem] object-cover mx-auto my-4 rounded-[20px]"
          src={imageUrl}
          alt={`${type} product`}
        />
        <p className=" pb-2 text-center font-semibold">{`Giá: $${price}`}</p>
        <Link
          to={"/googlelogin"}
          className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] hover:bg-orange-500"
        >
          <span className="mx-2">Xem sản phẩm</span>
        </Link>
      </div>
    </div>
  );
};

export default PetProductCard;
