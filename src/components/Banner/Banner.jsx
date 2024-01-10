const Banner = ({ imageUrl, description }) => {
  return (
    <div className="bg-orange-300 text-white  h-60 flex flex-row items-center rounded-full mx-40 ">
      <div className="w-1/2 flex justify-end ">
        <img
          src={imageUrl}
          alt="Product"
          className=" m-4 rounded-full  h-52 "
        />
      </div>
      <p className="text-lg w-1/2  ">{description}</p>
    </div>
  );
};

export default Banner;
