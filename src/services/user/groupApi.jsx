export const getUserGroups= async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/user/groups?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(`e khi lấy nhóm người dùng: ${e}`);
  }
};
