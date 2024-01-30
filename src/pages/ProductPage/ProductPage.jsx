import Banner from "../../components//Banner/Banner";
import ProductPart from "../../components/Products/ProductPart";
const ProductPage = () => {
  const productImageUrl = "src/assets/cat-brand.jpg";
  const productDescription = "Mô tả sản phẩm của bạn ở đây.";

  return (
    <div>
      <Banner
        imageUrl={productImageUrl}
        description={productDescription}
      ></Banner>
      <ProductPart></ProductPart>
    </div>
  );
};
export default ProductPage;
