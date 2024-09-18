export const ResisterUser = async (username, phone, email, password) => {
  try {
    const response = await fetch('http://localhost:3000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, phone, email, password }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(`e khi đăng ký: ${e}`);
  }
};

export const LoginUser = async (username, password) => {
  try {
    const phản_hồi = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const response = await phản_hồi.json();
    return response;
  } catch (e) {
    throw new Error(`Lỗi khi đăng nhập: ${e}`);
  }
};


export const UpdateUserInfo = async (userId, phone, email) => {
  try {
    const response = await fetch('http://localhost:3000/user/updateinfo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, phone, email }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(`e khi cập nhật thông tin người dùng: ${e}`);
  }
};

export const ChangePassword = async (userId, currentPassword, newPassword) => {
  try {
    const response = await fetch('http://localhost:3000/user/changepassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, currentPassword, newPassword }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(`e khi đổi mật khẩu: ${e}`);
  }
};
