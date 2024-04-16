export const getCart = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/cart/getcart/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Xử lý kết quả từ server (nếu cần)
    console.log(`http://localhost:3001/api/cart/getcart/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error during signup: ${error}`);
  }
};

export const updateCart = async (user_id, stuff_id, number) => {
  try {
    const response = await fetch(`http://localhost:3001/api/cart/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, stuff_id, number }),
    });
    // Xử lý kết quả từ server (nếu cần)

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error during signup: ${error}`);
  }
};
export const removeCart = async (product_id, type, user_id) => {
  try {
    const response = await fetch(`http://localhost:3001/api/cart/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id, type, user_id }),
    });
    // Xử lý kết quả từ server (nếu cần)

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error during signup: ${error}`);
  }
};
export const clearCart = async (user_id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/cart/clear${user_id}`,
      {
        method: "DELETE",
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

export const addCart = async (user_id, type, stuff_id, number = 1) => {
  try {
    const response = await fetch(`http://localhost:3001/api/cart/addcart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, type, stuff_id, number }),
    });
    // Xử lý kết quả từ server (nếu cần)

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error during signup: ${error}`);
  }
};
