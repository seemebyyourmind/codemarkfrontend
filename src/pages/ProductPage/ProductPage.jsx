import { Outlet } from "react-router-dom";
import Banner from "../../components//Banner/Banner";

const ProductPage = () => {
  const productImageUrl = "src/assets/cat-brand.jpg";
  const productDescription =
    "Pethub.com là nền tảng mua sắm trực tuyến đáng tin cậy, kết nối người yêu thú cưng với thú cưng chất lượng và vật phẩm chăm sóc đa dạng, tạo nên một cộng đồng sôi động và hỗ trợ.";

  return (
    <div>
      <Banner
        imageUrl={productImageUrl}
        description={productDescription}
      ></Banner>
      <div className="flex flex-row mt-8 ">
        <Outlet />
      </div>
    </div>
  );
};
export default ProductPage;
