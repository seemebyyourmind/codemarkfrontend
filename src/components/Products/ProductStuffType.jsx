import { getStuffCatalog } from "../../services/productApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ProductStuffType = () => {
  const { catalogid } = useParams();
  const [type, setType] = useState([]);
  const catalogNames = [
    "Thức Ăn",
    "Đồ chơi",
    "Y tế",
    "Phụ kiện",
    "Quần áo",
    "Huấn luyện",
    "Chăm sóc",
    "Di chuyển",
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi hàm getPetBreed với async/await để đợi kết quả
        const result = await getStuffCatalog(catalogid);
        setType(result); // Cập nhật state với kết quả từ API
      } catch (error) {
        console.error("Error fetching pet breed:", error);
      }
    };
    fetchData(); // Gọi hàm fetchData khi component được mount

    // Nếu bạn muốn chạy hàm fetchData mỗi khi specieid thay đổi, hãy thêm specieid vào dependency array của useEffect
  }, [catalogid]);

  return (
    <div className="w-1/6 mr-8 p-4 bg-orange-100">
      <div className=" font-bold text-2xl">{catalogNames[catalogid - 1]}</div>
      <hr className=" h-1 mb-8 mt-5 bg-orange-400" />
      {type.map((type, item) => {
        return (
          <Link to={`/productpage/stuff/${catalogid}/${type.id}`} key={item}>
            <div>{type.name}</div>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductStuffType;
