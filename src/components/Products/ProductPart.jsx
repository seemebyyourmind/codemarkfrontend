import PetProductDetail from "./PetProduct/PetProductDetail";
import StuffProductDetail from "./StuffProduct/StuffProductDetail";
import ProductList from "./ProductList";

const ProductPart = () => {
  const state = false;

  const product = ["hoang", "pham", "mtp"];

  return (
    <>
      {state ? (
        <ProductList product={product}></ProductList>
      ) : (
        <StuffProductDetail />
      )}
    </>
  );
};
export default ProductPart;
