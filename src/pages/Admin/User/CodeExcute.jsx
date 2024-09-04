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

    const defaultPythonCode = `# Type your Python code here
def main():
    print("Hello, world!")

if __name__ == "__main__":
    main()`;

    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState(defaultCppCode);
    const [output, setOutput] = useState('');
    const [testCases, setTestCases] = useState(['']);
    const [numTestCases, setNumTestCases] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            setOutput("Đang xử lý...");
            console.log(code,language,testCases);
            const response = await runcodeUser(code,language,testCases);
           
            setOutput(response.output);
            console.log('response:',response);
        } catch (error) {
            console.error("Lỗi:", error);
            setOutput("Đã xảy ra lỗi khi chạy mã.");
        }finally {
            setIsSubmitting(false);
        }
    };

    const handleRun = () => {
        console.log('Đang chạy mã:', code);
        setOutput('Hello, world!');
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
                    <pre className="bg-gray-100 dark:bg-boxdark-2 p-4 rounded-lg overflow-x-auto text-black dark:text-bodydark">{output}</pre>
                </div>
            </div>
        </div>
    );
};

export default CodeExecute;
