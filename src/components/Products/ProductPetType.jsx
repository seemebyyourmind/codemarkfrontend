import { getPetBreed } from "../../services/productApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ProductPetType = () => {
  const { specieid } = useParams();
  const [type, setType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi hàm getPetBreed với async/await để đợi kết quả
        const result = await getPetBreed(specieid);
        setType(result); // Cập nhật state với kết quả từ API
      } catch (error) {
        console.error("Error fetching pet breed:", error);
      }
    };

    fetchData(); // Gọi hàm fetchData khi component được mount

    // Nếu bạn muốn chạy hàm fetchData mỗi khi specieid thay đổi, hãy thêm specieid vào dependency array của useEffect
  }, [specieid]);

  return (
    <div className="w-1/6 mr-8 p-4 bg-orange-100">
      <div className=" font-bold text-2xl">
        {specieid === "1" ? "Chó" : "Mèo"}
      </div>
      <hr className=" h-1 mb-8 mt-5 bg-orange-400" />

      {type.map((type, item) => {
        return (
          <Link to={`/productpage/pet/${specieid}/${type.id}`} key={item}>
            <div>{type.name}</div>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductPetType;
