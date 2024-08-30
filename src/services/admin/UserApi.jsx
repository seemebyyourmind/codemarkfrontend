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
      console.log(`http://localhost:3000/admin/user/getuserbyrole/?role=${role}&page=${page}?search=${search}`)
      const response = await fetch(
        `http://localhost:3000/admin/user/getuserbyrole/?role=${role}&page=${page}&search=${search}`,
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

  //  const getUserByGroup = async (group,page) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/api/cart/getcart/?group=${group}&page=${page}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     // Xử lý kết quả từ server (nếu cần)
     
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     throw new Error(`Error during signup: ${error}`);
  //   }
  // };
  export const GetUserSearch = async (query,page) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/cart/getcart/?search=${query}&page=${page}`,
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
