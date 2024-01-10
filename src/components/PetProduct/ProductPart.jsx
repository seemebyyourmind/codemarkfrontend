import PetProductDetail from "./PetProductDetail";
import ProductList from "../ProductList";
import ProductType from "./ProductType";
const ProductPart = () => {
  const state = false;
  const type = ["hoang", "pham"];
  const product = ["hoang", "pham", "mtp"];
  return (
    <div className="flex flex-row mt-8 ">
      <ProductType type={type}></ProductType>
      {state ? (
        <ProductList product={product}></ProductList>
      ) : (
        <PetProductDetail />
      )}
    </div>
  );
};
export default ProductPart;
