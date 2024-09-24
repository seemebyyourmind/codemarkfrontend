import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { runcodeUser } from '../../../services/runCodeApi';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeExecute = () => {
    const defaultCppCode = `#include <iostream>
using namespace std;

int main() {
    int a, b;
    
    cout << "Nhập số thứ nhất: ";
    cin >> a;
    cout << "Nhập số thứ hai: ";
    cin >> b;
    
    int sum = a + b;
    
    cout << "Tổng của hai số là: " << sum << endl;
    
    return 0;
}`;

    const defaultPythonCode = `def fibonacci_sum(n):
    if n <= 0:
        return 0
    
    # Khởi tạo các giá trị ban đầu của dãy Fibonacci
    a, b = 0, 1
    total_sum = 0
    
    # Tính tổng của dãy Fibonacci
    for _ in range(n):
        total_sum += a
        a, b = b, a + b
        
    return total_sum

# Lấy giá trị từ bàn phím
try:
    n = int(input("Nhập số phần tử n của dãy Fibonacci: "))
    if n < 0:
        raise ValueError("Số phần tử không thể là số âm.")
    print(f"Tổng của các số Fibonacci từ phần tử thứ 1 đến phần tử thứ {n} là: {fibonacci_sum(n)}")
except ValueError as e:
    print(f"Đã xảy ra lỗi: {e}")
`;

    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState(defaultCppCode);
    const [output, setOutput] = useState([]);
    const [testCases, setTestCases] = useState(['']);
    const [numTestCases, setNumTestCases] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const[message,setMessage]=useState('')

    useEffect(() => {
        if (language === 'cpp') {
            setCode(defaultCppCode);
        } else if (language === 'python') {
            setCode(defaultPythonCode);
        }
    }, [language]);

    useEffect(() => {
        setTestCases(prevTestCases => {
            const newTestCases = [...prevTestCases];
            while (newTestCases.length < numTestCases) {
                newTestCases.push('');
            }
            return newTestCases.slice(0, numTestCases);
        });
    }, [numTestCases]);

    const handleChange = (newCode) => {
        setCode(newCode);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleTestCaseChange = (index, value) => {
        setTestCases(prevTestCases => {
            const newTestCases = [...prevTestCases];
            newTestCases[index] = value;
            return newTestCases;
        });
    };

    const handleNumTestCasesChange = (event) => {
        setNumTestCases(Number(event.target.value));
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            setMessage("Đang xử lý...");
            console.log(code, language, testCases);
    
            // Gọi API runcodeUser
            const response = await runcodeUser(code, language, testCases);
            setOutput(response.runInfo.data);
            // const runData = response.runInfo.data;
            // console.log(runData);
            // if (runData.status) {
            //     // Trường hợp thực thi thành công
            //     console.log(runData)
            //     setOutput(runData.runInfo); // Lưu danh sách kết quả các test case
            //     console.log('chinh xac',output);
            // } else {
            //     // Trường hợp gặp lỗi
            //     setOutput([{ status: false, runInfo: runData.runInfo }]);
            //     console.log('sai',output);
            // }
    
            // console.log('response:', response);
        } catch (error) {
            console.error("Lỗi:", error);
            setMessage("Đã xảy ra lỗi khi chạy mã.");
        } finally {
            setIsSubmitting(false);
        }
    };
    

    const handleRun = () => {
        console.log('Đang chạy mã:', code);
        setMessage('Hello, world!');
    };

    return (
        <div className="bg-gray-100 min-h-screen dark:bg-boxdark-2">
            <Breadcrumb pageName="CodeExecute" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-bodydark">Trình biên tập mã</h1>
                <div className="mb-6">
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="w-full md:w-auto px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-boxdark dark:text-bodydark"
                    >
                        <option value="c_cpp">C++</option>
                        <option value="python">Python</option>
                    </select>
                </div>

                <div className='flex flex-col md:flex-row gap-8'>
                    <div className="w-full md:w-3/5">
                        <AceEditor
                            mode={language==='cpp'?'c_cpp':'python'}
                            theme="monokai"
                            name="code-editor"
                            onChange={handleChange}
                            value={code}
                            editorProps={{ $blockScrolling: true }}
                            setOptions={{
                                fontSize: 16,
                            }}
                            width='100%'
                            height='500px'
                            className="rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="w-full md:w-2/5 bg-white dark:bg-boxdark p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-bodydark">Trường hợp kiểm thử:</h3>
                        <label className="block mb-4">
                            Số lượng trường hợp kiểm thử:
                            <input
                                type="number"
                                value={numTestCases}
                                onChange={handleNumTestCasesChange}
                                min="1"
                                max="10"
                                className="ml-2 w-20 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-boxdark dark:text-bodydark"
                            />
                        </label>
                        {testCases.map((testCase, index) => (
                            <div key={index} className="mb-4">
                                <label className="block">
                                    Trường hợp kiểm thử {index + 1}:
                                    <textarea
                                        rows={3}
                                        value={testCase}
                                        onChange={(e) => handleTestCaseChange(index, e.target.value)}
                                        className="w-full mt-1 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-primary dark:bg-boxdark dark:text-bodydark"
                                        placeholder="Nhập trường hợp kiểm thử của bạn ở đây. Ví dụ: 5 3"
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                       {isSubmitting ? 'Đang xử lý...' : 'Gửi'}
                    </button>
                    <button
                        onClick={handleRun}
                        className="bg-success text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Chạy
                    </button>
                </div>
                <div className="mt-8 bg-white dark:bg-boxdark p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-bodydark">Kết quả:</h2>
                    <div className="overflow-x-auto">
                    <table className="w-full table-auto">
  <thead>
    <tr className="bg-gray-200 dark:bg-boxdark-2 text-left">
      <th className="py-2 px-4 font-medium text-black dark:text-white">Test Case</th>
      <th className="py-2 px-4 font-medium text-black dark:text-white">Input</th>
      <th className="py-2 px-4 font-medium text-black dark:text-white">Output</th>
      <th className="py-2 px-4 font-medium text-black dark:text-white">Thời gian thực hiện</th>
      <th className="py-2 px-4 font-medium text-black dark:text-white">Bộ nhớ sử dụng</th>
    </tr>
  </thead>
  <tbody>
    {output ? (
        // Kiểm tra nếu `output` tồn tại
        output.status ? (
            // Nếu status là true, hiển thị các trường hợp kiểm thử
            output.runInfo.map((testCase, testCaseIndex) => (
                <tr key={testCaseIndex} className="border-b border-gray-200 dark:border-boxdark-2">
                   
                        <td  className="py-2 px-4 text-gray-700 dark:text-gray-400">
                            Test Case {testCaseIndex+1}
                        </td>
                    
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-400">{testCase.input}</td>
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-400">{testCase.stdout}</td>
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-400">{testCase.timeExecute} ms</td>
                    <td className="py-2 px-4 text-gray-700 dark:text-gray-400">{testCase.totalUsageMemory} MB</td>
                </tr>
            ))
        ) : (
            // Nếu status là false, hiển thị thông tin lỗi
            <tr>
                <td colSpan="5" className="py-2 px-4 text-red-500 dark:text-red-400">
                    {output.runInfo}
                </td>
            </tr>
        )
    ) : (
        // Nếu không có dữ liệu nào để hiển thị
        <tr>
            <td colSpan="5" className="py-2 px-4 text-gray-700 dark:text-gray-400 text-center">
                {message}
            </td>
        </tr>
    )}
</tbody>

</table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeExecute;
