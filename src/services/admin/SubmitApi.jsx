export const getSubmitsByUserId = async (userId, page) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/submit/getbyuserid?id=${userId}&page=${page}`,
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

export const getSubmitsByProblemId = async (problemId, page) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/submit/getbyproblemid?id=${problemId}&page=${page}`,
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
    throw new Error(`Lỗi khi lấy danh sách submit của bài toán: ${error}`);
  }
};
export const getAllSubmits = async (page, limit, sort) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/submit/getall?page=${page}&limit=${limit}&sort=${sort}`,
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
    throw new Error(`Lỗi khi lấy danh sách tất cả các submit: ${error}`);
  }
};
export const deleteSubmit = async (submitId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/submit/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: submitId }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi xóa submit: ${error}`);
  }
};

export const getSubmitById = async (submitId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/submit/getbyid?id=${submitId}`,
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
    throw new Error(`Lỗi khi lấy thông tin submit: ${error}`);
  }
};
