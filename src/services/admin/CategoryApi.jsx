export const getCategories = async (page) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/category/getcategories?page=${page}`,
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
    throw new Error(`Lỗi khi lấy danh sách danh mục: ${error}`);
  }
};

export const createCategory = async (name, description) => {
  try {
    const response = await fetch(
      'http://localhost:3000/admin/category/createcategory',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi tạo danh mục mới: ${error}`);
  }
};

export const updateCategory = async (category_id, name, description) => {
  try {
    const response = await fetch(
      'http://localhost:3000/admin/category/updatecategory',
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category_id, name, description }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật thông tin danh mục: ${error}`);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(
      'http://localhost:3000/admin/category/deletecategory',
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category_id: categoryId }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi xóa danh mục: ${error}`);
  }
};

export const addCategoryToProblem = async (problemId, categoryId) => {
  try {
    const response = await fetch(
      'http://localhost:3000/admin/category/addcategorytoproblem',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem_id: problemId, category_id: categoryId }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi thêm danh mục vào bài toán: ${error}`);
  }
};

export const removeCategoryFromProblem = async (problemId, categoryId) => {
  try {
    const response = await fetch(
      'http://localhost:3000/admin/category/removecategoryfromproblem',
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem_id: problemId, category_id: categoryId }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi xóa danh mục khỏi bài toán: ${error}`);
  }
};
export const getCategoryInfo = async (categoryId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/category/getcategoryinfo?id=${categoryId}`,
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
    throw new Error(`Lỗi khi lấy thông tin nhóm: ${error}`);
  }
};
export const getProblemsWithCategoryStatus = async (categoryId, page = 1, search = '') => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/category/getproblemswithcategorystatus?id=${categoryId}&page=${page}&search=${search}`,
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
    throw new Error(`Lỗi khi lấy danh sách bài toán : ${error}`);
  }
};
export const getProblemsInCategory = async ( category_id, page) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/category/getproblemswithcategory?id=${category_id}&page=${page}`,
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
    throw new Error(`Lỗi khi lấy danh sách bài toán : ${error}`);
  }
};