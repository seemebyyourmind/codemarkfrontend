import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { runcodeUser } from '../../../services/runCodeApi';

// Import necessary modes and themes
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeExecute = () => {
    const defaultCppCode = `#include <iostream>
using namespace std;

int main() {
    int a, b;
    
    // Nhập hai số từ bàn phím
    cout << "Nhập số thứ nhất: ";
    cin >> a;
    cout << "Nhập số thứ hai: ";
    cin >> b;
    
    // Tính tổng của hai số
    int sum = a + b;
    
    // In kết quả
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

    useEffect(() => {
        // Cập nhật code khi ngôn ngữ thay đổi
        if (language === 'cpp') {
            setCode(defaultCppCode);
        } else if (language === 'python') {
            setCode(defaultPythonCode);
        }
    }, [language]);

    useEffect(() => {
        // Cập nhật số lượng test case
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
            setOutput("Loading...");
            console.log(code,language,testCases);
            const response = await runcodeUser(code,language,testCases) // Gửi mảng testCases );
           
            setOutput(response.output); // Xử lý kết quả từ server
            console.log('response:',response);
        } catch (error) {
            console.error("Error:", error);
            setOutput("An error occurred while running the code.");
        }
    };

    const handleRun = () => {
        console.log('Running code:', code);
        setOutput('Hello, world!');
    };

    return (
        <>
            <Breadcrumb pageName="CodeExecute" />
            <div className="m-5">
                <h1 className="text-3xl font-bold mb-4">Code Editor</h1>
                <div className="mb-4">
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="border border-gray-300 rounded p-2"
                    >
                        <option value="c_cpp">C++</option>
                        <option value="python">Python</option>
                    </select>
                </div>

                <div className='flex '>
                    <AceEditor
                        mode={language==='cpp'?'c_cpp':'python'}
                        theme="monokai"
                        name="code-editor"
                        onChange={handleChange}
                        value={code}
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                            fontSize: 18,
                        }}
                        height='500px'
                        width='800px'
                    />

                    <div className="mt-4 mx-4 w-2/5">
                        <h3 className="text-lg font-bold mb-2">Test Cases:</h3>
                        <label className="block mb-2">
                            Number of test cases:
                            <input
                                type="number"
                                value={numTestCases}
                                onChange={handleNumTestCasesChange}
                                min="1"
                                max="10"
                                className="border border-gray-300 rounded p-2 ml-2 w-20"
                            />
                        </label>
                        {testCases.map((testCase, index) => (
                            <div key={index} className="mb-2">
                                <label className="block">
                                    Test case {index + 1}:
                                    <textarea
                                    rows={3}
                                        type="text"
                                        value={testCase}
                                        onChange={(e) => handleTestCaseChange(index, e.target.value)}
                                        className="border border-gray-300 rounded p-2 mt-1 w-full"
                                        placeholder="Enter your test case here. For example: 5 3"
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-2 hover:bg-blue-600"
                    >
                        Submit
                    </button>
                    <button
                        onClick={handleRun}
                        className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
                    >
                        Run
                    </button>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Code Output:</h2>
                    <pre className="bg-gray-100 p-4 rounded mt-2">{output}</pre>
                </div>
            </div>
        </>
    );
};

export default CodeExecute;
