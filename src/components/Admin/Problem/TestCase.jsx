import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemInfo,createTestcase, updateTestcase, deleteTestcase } from '../../../services/admin/ProblemApi';

const ProblemTestCase = () => {
  const { id } = useParams();
  const [testCases, setTestCases] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
  
    fetchProblem();
  }, [id]);
  const fetchProblem=async()=>{
    try {
        const Problem= await getProblemInfo(id);
        setTestCases(Problem.Testcase);
       
        
     
    } catch (error) {
       setError(error)
    } finally{
    setLoading(false)
    }
  
}
const addTestCase = async () => {
  try {
    const newTestCase = {
      problem_id: id,
      input: '',
      output: ''
    };

    const response = await createTestcase(newTestCase.problem_id, newTestCase.input, newTestCase.output);
    // Assuming `response` contains the new test case with its `testcase_id`
    setTestCases([...testCases, response]);
    setEditingId(response.testcase_id);
  } catch (error) {
    setError('Failed to add test case');
  }
};

  const editTestCase = (testcaseId) => {
    setEditingId(testcaseId);
  };

  const saveTestCase = async (testcase) => {
    try {
      await updateTestcase(testcase.testcase_id, testcase.input, testcase.output);
      const updatedTestCases = testCases.map(tc =>
        tc.testcase_id === testcase.testcase_id ? testcase : tc
      );
      setTestCases(updatedTestCases);
      setEditingId(null);
    } catch (error) {
      setError('Failed to save test case');
    }
  };

  const deleteTestCase = async (testcaseId) => {
    try {
      await deleteTestcase(testcaseId);
      const updatedTestCases = testCases.filter(tc => tc.testcase_id !== testcaseId);
      setTestCases(updatedTestCases);
    } catch (error) {
      setError('Failed to delete test case');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!testCases) return <div className="text-center mt-8">No problem found</div>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Test Cases</h1>
      {testCases.map((testCase) => (
        <div key={testCase.testcase_id} className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Test Case {testCase.testcase_id}</h2>
          {editingId === testCase.testcase_id ? (
            <EditTestCaseForm 
              testCase={testCase} 
              onSave={saveTestCase} 
              onCancel={() => setEditingId(null)} 
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Input:</h3>
                <pre className="bg-gray-200 p-3 rounded-md overflow-x-auto">
                  <code>{testCase.input}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Output:</h3>
                <pre className="bg-gray-200 p-3 rounded-md overflow-x-auto">
                  <code>{testCase.output}</code>
                </pre>
              </div>
            </div>
          )}
          <div className="mt-4 space-x-2">
            <button 
              onClick={() => editTestCase(testCase.testcase_id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button 
              onClick={() => deleteTestCase(testCase.testcase_id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button 
        onClick={addTestCase}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Test Case
      </button>
    </div>
  );
};
const EditTestCaseForm = ({ testCase, onSave, onCancel }) => {
    const [input, setInput] = useState(testCase.input);
    const [output, setOutput] = useState(testCase.output);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({ ...testCase, input, output });
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Input:</label>
          <textarea 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows="3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Output:</label>
          <textarea 
            value={output} 
            onChange={(e) => setOutput(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows="3"
          />
        </div>
        <div className="space-x-2">
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </form>
    );
  };

export default ProblemTestCase;