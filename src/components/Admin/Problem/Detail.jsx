import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemInfo, updateProblemDetail } from '../../../services/admin/ProblemApi';

const ProblemDetail = () => {
  const { id } = useParams();
 
  const [codeDetails, setCodeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    languageId: '',
    sourceCode: '',
    timeEx: '',
    memory: ''
  });

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      const problem = await getProblemInfo(id);
      
      setCodeDetails(problem.ProblemDetail);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (languageId) => {
    setShowUpdateForm(true);
    const detail = codeDetails.find(d => d.language_id === languageId);
    setUpdateData({
      languageId: detail.language_id,
      sourceCode: detail.source_code,
      timeEx: detail.time_ex,
      memory: detail.memory
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProblemDetail(id, updateData.languageId, updateData.sourceCode, updateData.timeEx, updateData.memory);
      setShowUpdateForm(false);
      fetchProblem();
    } catch (error) {
      setError('Lỗi khi cập nhật: ' + error.message);
    }
  };

  if (loading) return <div className="text-center mt-8">Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!codeDetails) return <div className="text-center mt-8">Không tìm thấy bài toán</div>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">Chi tiết mã nguồn</h1>
      {/* {problemInfo && (
        <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">{problemInfo.title}</h2>
          <p className="mb-2 dark:text-white"><span className="font-medium">Mô tả:</span> {problemInfo.description}</p>
          <p className="mb-2 dark:text-white"><span className="font-medium">Độ khó:</span> {problemInfo.difficulty}</p>
          <p className="dark:text-white"><span className="font-medium">Ngày tạo:</span> {new Date(problemInfo.created).toLocaleDateString()}</p>
        </div>
      )} */}
      {codeDetails.map((detail, index) => (
        <div key={index} className="mb-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 capitalize text-blue-600 dark:text-blue-400">{detail.language_name}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2 dark:text-white">Mã nguồn:</h3>
              <pre className="bg-gray-500 text-blue-300 p-4 rounded-md overflow-x-auto">
                <code >{detail.source_code || 'Chưa cung cấp'}</code>
              </pre>
            </div>
            <p className="dark:text-white"><span className="font-medium">Thời gian thực thi:</span> {detail.time_ex || 'Chưa xác định'}</p>
            <p className="dark:text-white"><span className="font-medium">Bộ nhớ sử dụng:</span> {detail.memory || 'Chưa xác định'}</p>
            <button
              onClick={() => handleUpdate(detail.language_id)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Cập nhật
            </button>
          </div>
        </div>
      ))}

      {showUpdateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Cập nhật chi tiết bài toán</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="sourceCode">
                  Mã nguồn
                </label>
                <textarea
                  id="sourceCode"
                  value={updateData.sourceCode}
                  onChange={(e) => setUpdateData({...updateData, sourceCode: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="6"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="timeEx">
                  Thời gian thực thi
                </label>
                <input
                  id="timeEx"
                  type="text"
                  value={updateData.timeEx}
                  onChange={(e) => setUpdateData({...updateData, timeEx: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="memory">
                  Bộ nhớ sử dụng
                </label>
                <input
                  id="memory"
                  type="text"
                  value={updateData.memory}
                  onChange={(e) => setUpdateData({...updateData, memory: e.target.value})}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cập nhật
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemDetail;