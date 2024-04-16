import { Link } from "react-router-dom";
const SubNav = () => {
  const Item = [
    { name: "Chó ", path: "productpage/pet/1" },
    { name: "Mèo", path: "productpage/pet/2" },
    { name: "Thức Ăn", path: "/productpage/stuff/1" },
    { name: "Đồ chơi", path: "/productpage/stuff/2" },
    { name: "Y tế", path: "/productpage/stuff/3" },
    { name: "Phụ kiện", path: "/productpage/stuff/4" },
    { name: "Quần áo", path: "/productpage/stuff/5" },
    { name: "Huấn luyện", path: "/productpage/stuff/6" },
    { name: "Chăm sóc", path: "/productpage/stuff/7" },
    { name: "Di chuyển", path: "/productpage/stuff/8" },
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
