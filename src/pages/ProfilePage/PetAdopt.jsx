import { useState } from "react";

const PetAdopt = () => {
  const [images, setImages] = useState([]);

  const [info, setInfo] = useState("");

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "gph8dsez"); // Thay thế bằng upload preset của bạn từ Cloudinary
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhwhjdkrr/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ); // Thay thế YOUR_CLOUD_NAME bằng tên cloud của bạn từ Cloudinary

    const data = await res.json();

    return data.url;
  };

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrls = await Promise.all(
      images.map((image) => uploadImage(image))
    );
    console.log(images);
    setImages([]);
    setInfo("");
    console.log(imageUrls);
    // Gửi thông tin và url của ảnh đã được upload lên server của bạn
    // fetch('/your-server-endpoint', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ info, images: imageUrls }),
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        placeholder="Thông tin"
        required
      />

      {[1, 2, 3, 4].map((index) => (
        <div key={index}>
          <input
            type="file"
            onChange={(e) => handleImageChange(e, index - 1)}
            required
          />
        </div>
      ))}

      <button type="submit">Cập nhật</button>
    </form>
  );
};

export default PetAdopt;
