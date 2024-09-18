import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProblemInfo } from "../../../services/admin/ProblemApi";
import { runAndSubmitCode } from '../../../services/runCodeApi';
import { getSubmitsByUserAndProblem } from '../../../services/user/submitApi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";

const Problem = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('info');
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [submissionResult, setSubmissionResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const userId = useSelector(state => state.auth.user.user_id);
  const [canSubmit, setCanSubmit] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [submits, setSubmits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const quillRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Thêm trạng thái đang nộp bài

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const Problem = await getProblemInfo(id);
        const response = await getSubmitsByUserAndProblem(2, 6, currentPage);
        setSubmits(response.submits);
        setTotalPages(response.totalPages);
        setProblem(Problem.ProblemInfo[0]);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin bài toán:', error);
      }
    };
    fetchProblemDetails();
  }, [id]);

  useEffect(() => {
    const fetchSubmits = async () => {
      try {
        const response = await getSubmitsByUserAndProblem(2, 6, currentPage);
        console.log(response);
        setSubmits(response.submits);
        setTotalPages(response.totalPages);
        console.log(totalPages);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách submit:', error);
      }
    };
    fetchSubmits();
  }, [currentPage]);

  useEffect(() => {
    let timer;
    if (!canSubmit) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setCanSubmit(true);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [canSubmit]);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.root.setAttribute('contenteditable', false);
    }
  }, [problem]);

  const handleSubmit = async () => {
    if (!canSubmit) {
      alert(`Vui lòng đợi ${countdown} giây trước khi nộp bài lại.`);
      return;
    }

    try {
      setIsSubmitting(true); // Đặt trạng thái đang nộp bài
      let submissionCode = code;
      if (selectedFile) {
        submissionCode = await readFileContent(selectedFile);
      }
      const response = await runAndSubmitCode(submissionCode, id, language, userId);
      console.log('Kết quả từ backend:', response);
      setSubmissionResult(response);
      setShowPopup(true);

      setCanSubmit(false);
      setCountdown(120);
    } catch (error) {
      console.error('Lỗi khi nộp bài:', error);
    }finally {
      setIsSubmitting(false); // Xóa trạng thái đang nộp bài
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (fileExtension === 'py' || fileExtension === 'cpp') {
        setSelectedFile(file);
        setLanguage(fileExtension === 'py' ? 'python' : 'cpp');
      } else {
        alert('Chỉ chấp nhận file .py hoặc .cpp');
        event.target.value = '';
      }
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 ${activeTab === 'info' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('info')}
        >
          Thông tin
        </button>
        <button
          className={`mr-2 px-4 py-2 ${activeTab === 'submit' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('submit')}
        >
          Nộp code
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'results' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('results')}
        >
          Kết quả
        </button>
      </div>

      {activeTab === 'info' && problem && (
        <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
            <div className="space-y-2 text-center">
              <p className="text-gray-600"><span className="font-semibold">ID bài toán:</span> {problem.problem_id}</p>
              <p className="text-gray-600"><span className="font-semibold">Độ khó:</span> {problem.difficulty}</p>
              <p className="text-gray-600"><span className="font-semibold">Ngày tạo:</span> {new Date(problem.created).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Mô tả:</h2>
              <div className="text-gray-800 bg-gray-100 p-4 rounded" style={{ marginLeft: '200px', marginRight: '200px' }}>
                <ReactQuill 
                  value={problem.description} 
                  readOnly={true} 
                  theme={null} 
                  ref={quillRef}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'submit' && (
        <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Nộp bài giải</h2>
          <div className="mb-6">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full md:w-auto px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            >
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>
          </div>
          <div className='flex flex-col md:flex-row gap-8'>
            <div className="w-full md:w-3/5">
              <AceEditor
                mode={language === 'cpp' ? 'c_cpp' : 'python'}
                theme="monokai"
                name="code-editor"
                onChange={handleCodeChange}
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
            <div className="w-full md:w-2/5">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Hoặc tải lên file code (.py hoặc .cpp):
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".py,.cpp"
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
              <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 text-black rounded-lg ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
          >
            {isSubmitting ? 'Đang nộp...' : 'Nộp bài'}
          </button>
              {submissionResult && showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-bold mb-4">Kết quả nộp bài</h3>
                {submissionResult.runningInfo.data.status ? (
                 <div>
                   <table className="w-full mb-4">
                     <thead>
                       <tr>
                         <th>Thời gian chạy</th>
                         <th>Bộ nhớ sử dụng</th>
                         <th>Trạng thái</th>
                         <th>Đầu vào</th>
                         <th>Đầu ra</th>
                       </tr>
                     </thead>
                     <tbody>
                       {submissionResult.runningInfo.data.runInfo.map((info, index) => (
                         <tr key={index}>
                           <td>{info.timeExecute} ms</td>
                           <td>{info.totalUsageMemory} KB</td>
                           <td>{info.status}</td>
                           <td>{info.input}</td>
                           <td>{info.stdout}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                   <div className="mt-4">
                     <h4 className="text-lg font-bold mb-2">Thông tin:</h4>
                     <p>Số lượng testcase qua: {submissionResult.runningInfo.data.info.numberTestcasePass}</p>
                     <p>Tổng số testcase: {submissionResult.runningInfo.data.info.numberTestcase}</p>
                   </div>
                 </div>
                ) : (
                  <div className="mt-4">
                    <h4 className="text-lg font-bold mb-2">Lỗi:</h4>
                    <pre className="bg-red-100 p-4 rounded text-red-700">{submissionResult.runningInfo.data.runInfo}</pre>
                  </div>
                )}
                <button onClick={closePopup} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                 Đóng
                </button>

              </div></div>
                

              )}
            </div>
          </div>
          
         
        </div>
      )}

      {activeTab === 'results' && (
        <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Lịch sử nộp bài</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Trạng thái</th>
                <th className="py-2 px-4 border-b text-left">Điểm</th>
                <th className="py-2 px-4 border-b text-left">Ngôn ngữ</th>
                <th className="py-2 px-4 border-b text-left">Thời gian</th>
                <th className="py-2 px-4 border-b text-left">Bộ nhớ</th>
              </tr>
            </thead>
            <tbody>
              {submits.map((submit) => (
                <tr key={submit.submit_id}>
                  <td className="py-2 px-4 border-b">{submit.submit_id}</td>
                  <td className="py-2 px-4 border-b">{submit.status}</td>
                  <td className="py-2 px-4 border-b">{submit.points}</td>
                  <td className="py-2 px-4 border-b">{submit.language_name}</td>
                  <td className="py-2 px-4 border-b">{submit.timeExecute || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{submit.memoryUsage || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center items-center">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="mx-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition duration-300 ease-in-out"
              >
                Trước
              </button>
            )}
            <span className="mx-4 text-lg font-medium">
              Trang {currentPage} / {totalPages}
            </span>
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="mx-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition duration-300 ease-in-out"
              >
                Sau
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Problem;
