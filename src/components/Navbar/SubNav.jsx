import { Link } from "react-router-dom";
const SubNav = () => {
  const Item = [
    { name: "Chó ", path: "/category/cho" },
    { name: "Mèo", path: "/category/meo" },
    { name: "Y tế", path: "/category/yte" },
    { name: "Thức Ăn", path: "/category/thucan" },
    { name: "Nhân giống", path: "/category/nhangiong" },
    { name: "Khuyến mãi", path: "/category/khuyenmai" },
  ];

  return (
    <div className="text-sm flex flex-row justify-around my-4 ">
      {Item.map((cate, index) => {
        return (
          <Link
            className=" w-28 py-2 text-center  font-medium rounded-full text-white text-base bg-orange-300 hover:bg-orange-500"
            key={index}
            to={cate.path}
          >
            {cate.name}
          </Link>
        );
      })}
    </div>
  );
};
export default SubNav;
