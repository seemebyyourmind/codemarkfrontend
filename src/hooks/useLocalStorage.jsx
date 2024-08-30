import { useEffect, useState } from 'react';

// Hàm custom hook không sử dụng TypeScript
function useLocalStorage(key, initialValue) {
  // State để lưu trữ giá trị
  // Sử dụng hàm khởi tạo trong useState để chỉ thực thi logic một lần
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Lấy dữ liệu từ local storage bằng key
      const item = window.localStorage.getItem(key);
      // Phân tích JSON lưu trữ hoặc nếu không có thì trả về initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Nếu có lỗi, cũng trả về initialValue
      console.log(error);
      return initialValue;
    }
  });

  // useEffect để cập nhật local storage khi trạng thái thay đổi
  useEffect(() => {
    try {
      // Cho phép giá trị là một hàm để có cùng API như useState
      const valueToStore =
        typeof storedValue === 'function'
          ? storedValue(storedValue)
          : storedValue;
      // Lưu trạng thái
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Triển khai nâng cao hơn sẽ xử lý trường hợp lỗi
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
