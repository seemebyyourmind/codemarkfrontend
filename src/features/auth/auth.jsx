import { login } from "../../features/auth/authSlice";
import { LoginApi } from "../../services/userApi";
export const loginUserAsync = (phone, password) => async (dispatch) => {
  try {
    console.log(phone, password);
    // Gửi dữ liệu đăng ký đến server

    const result = await LoginApi(phone, password);
    // Xử lý kết quả từ server (nếu cần)
    console.log(result.status);
    if (result.status === "sucess") {
      dispatch(
        login({
          user: result.user,
          access_token: result.access_token,
          refresh_token: result.refresh_token,
        })
      );
    }
    return result;
  } catch (error) {
    console.error("Error registering:", error);
  }
};
