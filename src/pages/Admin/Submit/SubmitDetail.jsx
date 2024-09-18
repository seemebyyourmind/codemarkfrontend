import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSubmitById } from '../../../services/admin/SubmitApi';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';

const SubmitDetail = () => {
  const [submitInfo, setSubmitInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSubmitInfo = async () => {
      try {
        setIsLoading(true);
        const data = await getSubmitById(id);
        setSubmitInfo(data.submit);
      } catch (err) {
        setError('Có lỗi xảy ra khi tải thông tin submit');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmitInfo();
  }, [id]);

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  if (!submitInfo) return <div>Không tìm thấy thông tin submit</div>;

  return (
    <>
      <Breadcrumb pageName='Chi tiết Submit' />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Thông tin Submit</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Submit ID:</strong> {submitInfo.submit_id}</p>
            <p><strong>User ID:</strong> {submitInfo.user_id}</p>
            <p><strong>Tên người dùng:</strong> {submitInfo.username}</p>
            <p><strong>Problem ID:</strong> {submitInfo.problem_id}</p>
            <p><strong>Tiêu đề bài toán:</strong> {submitInfo.title}</p>
            <p><strong>Trạng thái:</strong> {submitInfo.status}</p>
            <p><strong>Điểm:</strong> {submitInfo.points}</p>
          </div>
          <div>
            <p><strong>Số testcase đạt:</strong> {submitInfo.numberTestcasePass}/{submitInfo.numberTestcase}</p>
            <p><strong>Ngôn ngữ ID:</strong> {submitInfo.language_id}</p>
            <p><strong>Tên ngôn ngữ:</strong> {submitInfo.language_name}</p>
            <p><strong>Thời gian thực thi:</strong> {submitInfo.timeExecute} ms</p>
            <p><strong>Bộ nhớ sử dụng:</strong> {submitInfo.memoryUsage} MB</p>
            <p><strong>Lỗi:</strong> {submitInfo.error || 'Không có lỗi'}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Mã nguồn:</h3>
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto">
            <code>{submitInfo.source}</code>
          </pre>
        </div>
      </div>
    </>
  );
};

export default SubmitDetail;