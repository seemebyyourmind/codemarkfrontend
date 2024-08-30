import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemInfo } from '../../../services/admin/ProblemApi';

const ProblemSubmit= () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    fetchProblem();
  }, [id]);
  const fetchProblem=async()=>{
    try {
        const Problem= await getProblemInfo(id)
        setProblem(Problem.ProblemInfo[0])
    } catch (error) {
       setError(error)
    } finally{
    setLoading(false)
    }
  
}

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!problem) return <div className="text-center mt-8">No problem found</div>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600"><span className="font-semibold">Problem ID:</span> {problem.problem_id}</p>
          <p className="text-gray-600"><span className="font-semibold">Difficulty:</span> {problem.difficulty}</p>
          <p className="text-gray-600"><span className="font-semibold">Created:</span> {new Date(problem.created).toLocaleDateString()}</p>
          <p className="text-gray-600"><span className="font-semibold">Author:</span> {problem.username || 'Unknown'}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Description:</h2>
          <p className="text-gray-800">{problem.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProblemSubmit;