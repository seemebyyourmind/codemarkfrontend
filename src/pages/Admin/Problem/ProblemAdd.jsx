import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb'
import { useState, useEffect } from 'react';
import { createProblem, getLanguages } from '../../../services/admin/ProblemApi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProblemAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Dễ');
  const [languages, setLanguages] = useState([]);
  const [problemDetails, setProblemDetails] = useState([]);
  const [testcaseCount, setTestcaseCount] = useState(1);
  const [testcases, setTestcases] = useState([{ input: '', output: '' }]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languagesData = await getLanguages();
        setLanguages(languagesData.languages);
        setProblemDetails(languagesData.languages.map(lang => ({
          language_id: lang.language_id,
          source_code: '',
          time_ex: 1,
          memory: 128
        })));
      } catch (error) {
        console.error('Lỗi khi lấy danh sách ngôn ngữ:', error);
        toast.error('Lỗi khi lấy danh sách ngôn ngữ');
      }
    };
    fetchLanguages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const problemData = {
        title,
        description,
        difficulty,
        testcases,
        problemDetails
      };
      const response = await createProblem(problemData);
      console.log('dữ liệu gửi', problemData);
      console.log('Bài toán đã được tạo:', response);
      
      if (response.message === "Tạo bài toán thành công" && response.problem_id) {
        toast.success("Tạo bài toán thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate(`/admin/problem/problemdetail/${response.problem_id}`);
        }, 3000);
      } else {
        toast.error("Có lỗi xảy ra khi tạo bài toán", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Lỗi khi tạo bài toán:', error);
      toast.error("Có lỗi xảy ra khi tạo bài toán", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleProblemDetailChange = (index, field, value) => {
    const newProblemDetails = [...problemDetails];
    newProblemDetails[index][field] = value;
    setProblemDetails(newProblemDetails);
  };

  const handleTestcaseChange = (index, field, value) => {
    const newTestcases = [...testcases];
    newTestcases[index][field] = value;
    setTestcases(newTestcases);
  };

  const updateTestcaseCount = (count) => {
    setTestcaseCount(count);
    setTestcases(Array(count).fill().map(() => ({ input: '', output: '' })));
  };

  const modules = {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
      <Breadcrumb pageName='Thêm bài tập' />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
            Tiêu đề
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={modules}
            className="h-100 mb-12"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="difficulty" className="block mb-2 text-sm font-medium text-gray-700">
            Độ khó
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Dễ">Dễ</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Khó">Khó</option>
          </select>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Chi tiết bài toán</h3>
          {problemDetails.map((detail, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
              <h4 className="font-medium mb-2">{languages[index]?.name}</h4>
              <div className="mb-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Mã nguồn
                </label>
                <textarea
                  value={detail.source_code}
                  onChange={(e) => handleProblemDetailChange(index, 'source_code', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Thời gian thực thi (giây)
                  </label>
                  <input
                    type="number"
                    value={detail.time_ex}
                    onChange={(e) => handleProblemDetailChange(index, 'time_ex', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Bộ nhớ (MB)
                  </label>
                  <input
                    type="number"
                    value={detail.memory}
                    onChange={(e) => handleProblemDetailChange(index, 'memory', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Testcases</h3>
          <div className="mb-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Số lượng testcase
            </label>
            <input
              type="number"
              value={testcaseCount}
              onChange={(e) => updateTestcaseCount(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
            />
          </div>
          {testcases.map((testcase, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
              <h4 className="font-medium mb-2">Testcase {index + 1}</h4>
              <div className="mb-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Input
                </label>
                <textarea
                  value={testcase.input}
                  onChange={(e) => handleTestcaseChange(index, 'input', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Output
                </label>
                <textarea
                  value={testcase.output}
                  onChange={(e) => handleTestcaseChange(index, 'output', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Tạo bài toán
        </button>
      </form>
    </div>
  );
};

export default ProblemAdd;