export const getInfo = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/admin/getInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/admin/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};