import StuffProductCard from "./StuffProduct/StuffProductCart";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getProductByCatalogType,
  getProductByCatalog,
} from "../../services/productApi";

const StuffProductList = () => {
  const { catalogid, id } = useParams();
  const [type, setType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const result = await getProductByCatalog(id);

          setType(result);

          // Gọi hàm getPetBySpecies khi specieid thay đổi
        } else {
          // Gọi hàm getPetByBreed khi id thay đổi
          const result = await getProductByCatalogType(catalogid);
          setType(result);
        }
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    fetchData(); // Gọi hàm fetchData khi component được mount hoặc khi dependencies thay đổi
  }, [catalogid, id]);

  return (
    <div className="w-5/6 p-4 bg-orange-100">
      <div className="text-3xl  font-bold py-4">Nổi bật</div>
      <hr className=" h-1 mb-6 mt-1 bg-orange-400" />
      <div className="grid grid-cols-3 gap-4">
        {type.map((stuff, index) => {
          return <StuffProductCard key={index} info={stuff} />;
        })}

        {/* <PetProductCard {...dogProduct} />
        <PetProductCard {...dogProduct} />
        <PetProductCard {...catProduct} /> */}
        {/* <StuffProductCard {...dogProduct}></StuffProductCard>
        <StuffProductCard {...catProduct}></StuffProductCard>
        <StuffProductCard {...dogProduct}></StuffProductCard> */}
      </div>
    </div>
  );
};
export default StuffProductList;
