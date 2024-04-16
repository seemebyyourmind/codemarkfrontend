// lấy danh sách giống chó mèo
export const getPetBreed = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/product/getbreed/${id}`,
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

// lấy danh sách danh mục theo từng loại sản phẩm
export const getStuffCatalog = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/product/getcatalog/${id}`,
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

//danh sách toàn bộ pet trang thứ page
export const getPet = async (page) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/product/pet/all/${page}`,
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

//danh sách toàn bộ vật phẩm trang thứ page
export const getStuff = async (page) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/product/petcare/all/${page}`,
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

//lấy pet  theo species ok
export const getPetBySpecies = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/product/pet/species/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Xử lý kết quả từ server (nếu cần)
    console.log(`http://localhost:3001/api/product/pet/species/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error during signup: ${error}`);
  }
};

//lấy pet theo breed
export const getPetByBreed = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/product/pet/breed/${id}`,
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

//Lấy pet theo loại lớn
export const getProductByCatalogType = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/product/petcare/catalogtype/${id}`,
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

//lấy pet theo loại nhỏ
export const getProductByCatalog = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/product/petcare/catalog/${id}`,
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

//lấy sản phẩm theo loại species
export const getProductBySpecies = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/product/petcare/species/${id}`,
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

export const getPetById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/product/pet/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Xử lý kết quả từ server (nếu cần)
    console.log(`http://localhost:3001/api/product/pet/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Error during signup: ${error}`);
  }
};
export const getPetCareById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/product/petcare/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Xử lý kết quả từ server (nếu cần)
    console.log(`http://localhost:3001/api/product/petcare/${id}`);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error during signup: ${error}`);
  }
};
