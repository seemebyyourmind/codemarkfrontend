import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemInfo } from '../../../services/admin/ProblemApi';

const ProblemDetail = () => {
  const { id } = useParams();
  const [codeDetails, setCodeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    fetchProblem();
  }, [id]);
  const fetchProblem=async()=>{
    try {
        const Problem= await getProblemInfo(id)
        setCodeDetails(Problem.ProblemDetail)
    } catch (error) {
       setError(error)
    } finally{
    setLoading(false)
    }
  
}

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!codeDetails) return <div className="text-center mt-8">No problem found</div>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold mb-6">Code Details</h1>
    {codeDetails.map((detail, index) => (
      <div key={index} className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 capitalize">{detail.language_name}</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Source Code:</h3>
            <pre className="bg-gray-800 text-white bg-graydark p-4 rounded-md overflow-x-auto">
              <code>{detail.source_code || 'Not provided'}</code>
            </pre>
          </div>
          <p><span className="font-medium">Execution Time:</span> {detail.time_ex || 'Not specified'}</p>
          <p><span className="font-medium">Memory Usage:</span> {detail.memory || 'Not specified'}</p>
        </div>
      </div>
    ))}
  </div>
  );
};

export default ProblemDetail;