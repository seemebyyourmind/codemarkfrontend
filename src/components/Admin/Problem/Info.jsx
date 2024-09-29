import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemInfo, updateProblemInfo } from '../../../services/admin/ProblemApi';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const ProblemInfo = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProblem, setEditedProblem] = useState(null);

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      const Problem = await getProblemInfo(id);
      setProblem(Problem.ProblemInfo[0]);
      setEditedProblem(Problem.ProblemInfo[0]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProblem(problem);
  };

  const handleSave = async () => {
    try {
      await updateProblemInfo(id, editedProblem.title, editedProblem.description, editedProblem.difficulty);
      setProblem(editedProblem);
      setIsEditing(false);
    } catch (error) {
      setError("Lỗi khi cập nhật bài toán: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProblem(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (content) => {
    setEditedProblem(prev => ({ ...prev, description: content }));
  };

  if (loading) return <div className="text-center mt-8">Đang tải...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!problem) return <div className="text-center mt-8">Không tìm thấy bài toán</div>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={editedProblem.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="difficulty"
            value={editedProblem.difficulty}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="easy">Dễ</option>
            <option value="medium">Trung bình</option>
            <option value="hard">Khó</option>
          </select>
          <ReactQuill
            value={editedProblem.description}
            onChange={handleDescriptionChange}
            className="h-100"
          />
          <div className="flex justify-end space-x-2">
            <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded">Hủy</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Lưu</button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{problem.title}</h1>
            <button onClick={handleEdit} className="px-4 py-2 bg-green-500 text-white rounded">Chỉnh sửa</button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-gray-600"><span className="font-semibold">ID bài toán:</span> {problem.problem_id}</p>
                <p className="text-gray-600"><span className="font-semibold">Độ khó:</span> {problem.difficulty}</p>
                <p className="text-gray-600"><span className="font-semibold">Ngày tạo:</span> {new Date(problem.created).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Mô tả:</h2>
              <div className="text-gray-800 bg-gray-100 p-4 rounded">
                <ReactQuill value={problem.description}   readOnly={true} theme={null} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProblemInfo;