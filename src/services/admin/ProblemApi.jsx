export const getProblemBySearch = async (difficulty,page,search) => {

    try {
      console.log(`http://localhost:3000/admin/problem/getproblemsearch/?difficulty=${difficulty}&page=${page}?search=${search}`)
      const response = await fetch(
        `http://localhost:3000/admin/problem/getproblemsearch/?difficulty=${difficulty}&page=${page}&search=${search}`,
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

  export const getProblemInfo = async (id) => {
  
    try {
      console.log(` http://localhost:3000/admin/problem/getprobleminfo?id=${id}`)
      const response = await fetch(
        ` http://localhost:3000/admin/problem/getprobleminfo?id=${id}`,
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
  
      // Xử lý kết quả từ server (nếu cần)
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error during testcase creation: ${error}`);
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
  
      // Xử lý kết quả từ server (nếu cần)
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error during testcase update: ${error}`);
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
  
      // Xử lý kết quả từ server (nếu cần)
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error during testcase deletion: ${error}`);
    }
  };
  