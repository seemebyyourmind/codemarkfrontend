const ProductType = ({ type }) => {
  return (
    <div className="w-1/6 mr-8 p-4 bg-orange-100">
      <div className=" font-bold text-2xl">Danh mục</div>
      <hr className=" h-1 mb-8 mt-5 bg-orange-400" />
      <div>
        {type.map((type, item) => {
          return <div key={item}> {type}</div>;
        })}
      </div>
    </div>
  );
};
export default ProductType;
