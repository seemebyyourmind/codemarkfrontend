import { useState } from "react";

const ImageSlider = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prevImage) => (prevImage - 1 + images.length) % images.length
    );
  };

  return (
    <div className="max-w-lg mx-auto my-8">
      <div className="relative">
        <img
          src={images[currentImage]}
          alt={`Image ${currentImage + 1}`}
          className="w-[512px] h-[350px] rounded-[20px]"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between">
          <button
            onClick={prevImage}
            className="text-white bg-orange-300 p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="text-white bg-orange-300 p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={`w-20 h-auto mx-2 rounded-lg cursor-pointer ${
              index === currentImage ? "border-4 border-orange-500" : ""
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
