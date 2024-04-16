import { Link } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";

const PetProductCard = ({ info }) => {
  return (
    <div className="w-[20rem] h-[26rem] bg-white rounded-[20px]">
      <div className="flex flex-row justify-between mb-4 h-[4rem]">
        {info.species_id === 1 ? (
          <FaDog color="rgb(251 191 36)" className="h-12 w-1/5" />
        ) : (
          <FaCat color="rgb(251 191 36)" className="h-12 w-1/5" />
        )}
        <div className="text-center w-3/5">
          <p className=" text-xl font-bold ">Mã P{info.pet_id}</p>
          <p>Giống {info.breed_name}</p>
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
          alt={`product`}
        />
        <p className=" pb-2 text-center font-semibold">{`Giá: $${info.price}`}</p>
        <Link
          to={`/petdetail/${info.pet_id}`}
          className="flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] hover:bg-orange-500"
        >
          <span className="mx-2">Xem sản phẩm</span>
        </Link>
      </div>
    </div>
  );
};

export default PetProductCard;
