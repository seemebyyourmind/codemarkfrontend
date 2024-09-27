export const getProblemBySearch = async (difficulty, page, search,cate) => {
  try {
    console.log(`http://localhost:3000/admin/problem/getproblemsearch/?difficulty=${difficulty}&page=${page}&search=${search}&category=${cate}`)
    const response = await fetch(
      `http://localhost:3000/admin/problem/getproblemsearch/?difficulty=${difficulty}&page=${page}&search=${search}&category=${cate}`,
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
    throw new Error(`Lỗi khi tìm kiếm bài toán: ${error}`);
  }
};

export const getProblemInfo = async (id) => {
  try {
    console.log(` http://localhost:3000/admin/problem/getprobleminfo?id=${id}`)
    const response = await fetch(
      `http://localhost:3000/admin/problem/getprobleminfo?id=${id}`,
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
    throw new Error(`Lỗi khi lấy thông tin bài toán: ${error}`);
  }
};

export const createTestcase = async (id, input, output) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/problem/createtestcase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem_id: id,
          input: input,
          output: output,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi tạo testcase: ${error}`);
  }
};

export const updateTestcase = async (testcase_id, input, output) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/problem/updatetestCase`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testcase_id: testcase_id,
          input: input,
          output: output,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật testcase: ${error}`);
  }
};

export const deleteTestcase = async (testcase_id) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/problem/deleteTestCase`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testcase_id: testcase_id,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi xóa testcase: ${error}`);
  }
};

export const deleteProblem = async (problemId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/problem/delete?id=${problemId}`,
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
    throw new Error(`Lỗi khi xóa bài toán: ${error}`);
  }
};

export const updateProblemInfo = async (problemId, title, description, difficulty) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/problem/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem_id: problemId,
          title: title,
          description: description,
          difficulty: difficulty,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật thông tin bài toán: ${error}`);
  }
};

export const updateProblemDetail = async (problemId, languageId, sourceCode, timeEx, memory) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/problem/updatedetail`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problem_id: problemId,
          language_id: languageId,
          source_code: sourceCode,
          time_ex: timeEx,
          memory: memory,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật chi tiết bài toán: ${error}`);
  }
};

export const getSubmitsByProblemId = async (problemId, page) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/problem/submits?id=${problemId}&page=${page}`,
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

export const createProblem = async (problemData) => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/problem/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(problemData),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Lỗi khi tạo bài toán mới: ${error}`);
  }
};

export const getLanguages = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/admin/problem/languages`,
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
    throw new Error(`Lỗi khi lấy danh sách ngôn ngữ lập trình: ${error}`);
  }
};
