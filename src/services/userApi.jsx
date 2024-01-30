export const SignUpApi = async (phone, password) => {
  try {
    const response = await fetch("http://localhost:3001/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });
    // Xử lý kết quả từ server (nếu cần)

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error during signup: ${error.message}`);
  }
};

export const LoginApi = async (phone, password) => {
  try {
    const response = await fetch("http://localhost:3001/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, password }),
    });
    // Xử lý kết quả từ server (nếu cần)

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error during signup: ${error}`);
  }
};
export const updateUser = async (userInfo, id, access_token) => {
  try {
    const response = await fetch("http://localhost:3001/api/user/update-user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ userInfo, id }),
    });
    // Xử lý kết quả từ server (nếu cần)

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error during signup: ${error}`);
  }
};

export const getOrders = async (id, access_token) => {
  try {
    const response = await fetch("http://localhost:3001/api/user/login", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, access_token }),
    });
    // Xử lý kết quả từ server (nếu cần)

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error during signup: ${error}`);
  }
};

export const Deleterders = async (id, access_token, order_id) => {
  try {
    const response = await fetch("http://localhost:3001/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, access_token, order_id }),
    });
    // Xử lý kết quả từ server (nếu cần)

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error during signup: ${error}`);
  }
};
