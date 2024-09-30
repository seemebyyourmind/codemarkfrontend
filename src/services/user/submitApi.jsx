const getSubmitsByUserAndProblem = async (userId, problemId, page = 1, limit = 10) => {
  try {
   
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_URL}/admin/submit/getbyuserandproblem?user_id=${userId}&problem_id=${problemId}&page=${page}&limit=${limit}`, {
      
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Lỗi khi gửi yêu cầu');
    }
    const data = await response.json();
    return data.submits;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách submit:', error);
    throw new Error('Không thể lấy danh sách submit');
  }
};

export { getSubmitsByUserAndProblem };
