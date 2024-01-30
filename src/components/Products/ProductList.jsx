import PetProductCard from "./PetProduct/PetProductCart";
import StuffProductCard from "./StuffProduct/StuffProductCart";
const ProductList = () => {
  const dogProduct = {
    type: "dog",
    code: "D123",
    discount: 10,
    breed: "Bun",
    sex: "cái",
    imageUrl: "https://placekitten.com/300/200",
    price: 49.99,
  };
  const catProduct = {
    type: "cat",
    code: "D123",
    discount: 10,
    sex: "đực",
    breed: "Bun",
    imageUrl: "https://placekitten.com/300/200",
    price: 49.99,
  };
  return (
    <div className="w-5/6 p-4 bg-orange-100">
      <div className="text-3xl  font-bold py-4">Nổi bật</div>
      <hr className=" h-1 mb-6 mt-1 bg-orange-400" />
      <div className="grid grid-cols-3 gap-4">
        <PetProductCard {...dogProduct} />
        <PetProductCard {...dogProduct} />
        <PetProductCard {...catProduct} />
        <StuffProductCard {...dogProduct}></StuffProductCard>
        <StuffProductCard {...catProduct}></StuffProductCard>
        <StuffProductCard {...dogProduct}></StuffProductCard>
      </div>
    </div>
  );
};
export default ProductList;
