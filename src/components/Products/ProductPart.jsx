import PetProductDetail from "./PetProduct/PetProductDetail";
import StuffProductDetail from "./StuffProduct/StuffProductDetail";
import ProductList from "./ProductList";
import ProductType from "./ProductType";
const ProductPart = () => {
  const state = true;
  const type = ["hoang", "pham"];
  const product = ["hoang", "pham", "mtp"];
  return (
    <div className="flex flex-row mt-8 ">
      <ProductType type={type}></ProductType>
      {state ? (
        <ProductList product={product}></ProductList>
      ) : (
        <StuffProductDetail />
      )}
    </div>
  );
};
export default ProductPart;
