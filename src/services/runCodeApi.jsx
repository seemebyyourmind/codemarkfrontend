export const runcodeUser = async (source_code, language, input) => {
    try {
        const requestData = {
            source_code: source_code,
            language: language,
           input: input
        };

        // In dữ liệu để kiểm tra
        console.log('Data to be sent:', requestData);
      const response = await fetch('http://localhost:3000/api/code/runcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            requestData    // Test case để chạy mã nguồn
        ),
      });
      
      // Kiểm tra xem response có OK không
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      // Xử lý kết quả trả về từ server
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error during code execution: ${error}`);
    }
  };
  