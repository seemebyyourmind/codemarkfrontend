import { update, selectAuth } from "../../features/auth/authSlice";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { updateUser } from "../../services/userApi";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token, user } = useSelector(selectAuth);

  const [username, setUsername] = useState(user.username || "");
  const [full_name, setFull_name] = useState(user.full_name || "");
  const [address, setAddress] = useState(user.address || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [email, setEmail] = useState(user.email || "");

  const handleSubmit = async (e) => {
    const id = user.id;
    e.preventDefault();
    const userInfo = { username, full_name, address, phone, email, id };
    console.log("Data submitted:", user);
    // Gửi dữ liệu cập nhật thông tin cá nhân đến server
    console.log(userInfo, user.id, access_token);
    const result = await updateUser(userInfo, user.id, access_token);

    console.log(result);
    dispatch(update({ user: userInfo }));
    navigate("../profile");
  };

  const handleUsernameChange = (e) => {
    // Cập nhật state khi giá trị thay đổi
    setUsername(e.target.value);
  };
  const handleFullname = (e) => {
    // Cập nhật state khi giá trị thay đổi
    setFull_name(e.target.value);
  };
  const handleAddressChange = (e) => {
    // Cập nhật state khi giá trị thay đổi
    setAddress(e.target.value);
  };
  const handlePhoneChange = (e) => {
    // Cập nhật state khi giá trị thay đổi
    setPhone(e.target.value);
  };
  const handleEmailChange = (e) => {
    // Cập nhật state khi giá trị thay đổi
    setEmail(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-orange-100 p-3 text-slate-800 text-center "
    >
      <div className=" py-2 border-white border-b-2">Cập nhập thông tin </div>

      <div className="flex flex-row  my-2">
        <label className="text-gray-500 w-1/3 p-2">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder={user.username}
          className="border p-2 w-2/3 rounded-lg"
        />
      </div>
      <div className="flex flex-row justify-around my-2 ">
        <label className="text-gray-500  w-1/3 p-2">Họ tên:</label>
        <input
          type="text"
          name="fullName"
          value={full_name}
          onChange={handleFullname}
          placeholder={user.full_name}
          className="border p-2 w-2/3 rounded-lg"
        />
      </div>
      <div className="flex flex-row justify-around my-2">
        <label className="text-gray-500 w-1/3 p-2">Địa chỉ giao hàng:</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleAddressChange}
          className="border p-2 w-2/3 rounded-lg"
          placeholder={user.address}
        />
      </div>
      <div className="flex flex-row justify-around my-2">
        <label className="text-gray-500 w-1/3 p-2">Số điện thoại:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={phone}
          onChange={handlePhoneChange}
          className="border p-2 w-2/3 rounded-lg"
          placeholder={user.phone}
        />
      </div>

      <div className="flex flex-row justify-around my-2">
        <label className="text-gray-500 w-1/3 p-2">Email:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={email}
          onChange={handleEmailChange}
          className="border p-2 w-2/3 rounded-lg"
          placeholder={user.email}
        />
      </div>
      <button
        type="submit"
        className=" my-8 flex flex-row bg-orange-300 text-white py-2 px-4 rounded-md justify-center mx-auto w-[250px] hover:bg-orange-500"
      >
        Cập nhập thông tin
      </button>
    </form>
  );
};

export default UpdateProfile;
