export const updateUser = async (updatedUser) => {
    // Gọi API để cập nhật dữ liệu trên server
    try {
        const response = await fetch(`/api/users/${updatedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });
        
        if (response.ok) {
            console.log("ok")
            // setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        } else {
            console.error('Update failed');
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

export const getUserByRole = async (role,page,search) => {

    try {
      let url = `http://localhost:3000/admin/user/getuserbyrole/?role=${role}&page=${page}`;
      if (search !== '') {
        url += `&search=${search}`;
      }
      console.log(url);
      const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Xử lý kết quả từ server (nếu cần)
     
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error during signup: ${error}`);
    }
  };

  

  export const getUsersInfo = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/admin/user/usersinfo',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Xử lý kết quả từ server (nếu cần)
     
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error during signup: ${error}`);
    }
  };

  export const getUserInfo = async (id) => {
    try {
    
      const response = await fetch(
        `http://localhost:3000/admin/user/userinfo?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Xử lý kết quả từ server (nếu cần)
     
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error during signup: ${error}`);
    }
  };
  export const getUserGroup = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/user/usergroup?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Xử lý kết quả từ server (nếu cần)
     
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error during signup: ${error}`);
    }
  };

  export const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/user/delete?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Lỗi khi xóa người dùng: ${error}`);
    }
  };

  export const setUserPassword = async (userId, newPassword) => {
    try {
      const response = await fetch(
        'http://localhost:3000/admin/user/setpassword',
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, new_password: newPassword }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Lỗi khi đặt mật khẩu mới: ${error}`);
    }
  };

  export const deleteUserFromGroup = async (userId, groupId) => {
    try {
      const response = await fetch(
        'http://localhost:3000/admin/user/deletefromgroup',
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, group_id: groupId }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Lỗi khi xóa người dùng khỏi nhóm: ${error}`);
    }
  };

  export const getUserSubmits = async (userId, page) => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/user/submits?id=${userId}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách submit của người dùng: ${error}`);
    }
  };
  export const updateUserRole = async (userId, roleId) => {
    console.log("userId",userId,"rolke:",roleId)
    try {
      const response = await fetch(
        'http://localhost:3000/admin/user/updaterole',
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, role_id: roleId }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật vai trò của người dùng: ${error}`);
    }
  };
  export const getUserRoles = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/admin/user/role',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách vai trò người dùng: ${error}`);
    }
  };
