export const getGroups = async (page) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/group/getgroups?page=${page}`,
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
    throw new Error(`Lỗi khi lấy danh sách nhóm: ${error}`);
  }
};

export const getUsersInGroup = async (groupId, page) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/group/getusersingroup?group_id=${groupId}&page=${page}`,
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
    throw new Error(`Lỗi khi lấy danh sách người dùng trong nhóm: ${error}`);
  }
};

export const getProblemsInGroup = async (groupId, page,cate) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/group/getproblemsingroup?group_id=${groupId}&page=${page}&category=${cate}`,
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
    throw new Error(`Lỗi khi lấy danh sách bài toán trong nhóm: ${error}`);
  }
};

export const createGroup = async (name, description) => {
  try {
    const response = await fetch(
      'http://localhost:3000/admin/group/creategroup',
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
    throw new Error(`Lỗi khi tạo nhóm mới: ${error}`);
  }
};

export const updateGroup = async (group_id, name, description) => {
  try {
    const response = await fetch(
      'http://localhost:3000/admin/group/updategroup',
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ group_id, name, description }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật thông tin nhóm: ${error}`);
  }
};

export const deleteGroup = async (groupId) => {
  try {
    const response = await fetch(
      'http://localhost:3000/admin/group/deletegroup',
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ group_id: groupId }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi xóa nhóm: ${error}`);
  }
};

export const addUserToGroup = async (userId, groupId) => {
  try {
    const response = await fetch(
      'http://localhost:3000/admin/group/addusertogroup',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, group_id: groupId }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi thêm người dùng vào nhóm: ${error}`);
  }
};

export const removeUserFromGroup = async (userId, groupId) => {
  try {
    const response = await fetch(
      'http://localhost:3000/admin/group/removeuserfromgroup',
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

export const addProblemToGroup = async (problemId, groupId) => {
  try {
    const response = await fetch(
      'http://localhost:3000/admin/group/addproblemtogroup',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem_id: problemId, group_id: groupId }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi thêm bài toán vào nhóm: ${error}`);
  }
};

export const removeProblemFromGroup = async (problemId, groupId) => {
  try {
    const response = await fetch(
      'http://localhost:3000/admin/group/removeproblemfromgroup',
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ problem_id: problemId, group_id: groupId }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi xóa bài toán khỏi nhóm: ${error}`);
  }
};

export const getGroupInfo = async (groupId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/group/getgroupinfo?id=${groupId}`,
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

export const getUsersWithGroupStatus = async (groupId, page = 1, search = '') => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/group/getuserswithgroupstatus?id=${groupId}&page=${page}&search=${search}`,
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
    throw new Error(`Lỗi khi lấy danh sách người dùng với trạng thái nhóm: ${error}`);
  }
};

export const getProblemsWithGroupStatus = async (groupId, page = 1, search = '') => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/group/getproblemswithgroupstatus?id=${groupId}&page=${page}&search=${search}`,
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
    throw new Error(`Lỗi khi lấy danh sách bài toán với trạng thái nhóm: ${error}`);
  }
};

