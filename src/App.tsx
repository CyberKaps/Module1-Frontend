
import { useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';

export default function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/api/code/analyze', {
        code,
        language
      });
      setResult(res.data);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error analyzing code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-white font-bold mb-6">Time & Space Complexity Estimator</h1>

        <label className="block mb-2 text-white  text-sm font-semibold">Language:</label>
        <select
          className="mb-4 p-2 bg-black text-white border rounded w-full"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
        </select>

        <label className="block mb-2 text-sm font-semibold">Your Code:</label>
        <div className="mb-4 border rounded">
          <Editor
            height="300px"
            defaultLanguage="python"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{ fontSize: 14, minimap: { enabled: false } }}
          />
        </div>

        <button
          className="bg-white text-black px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAnalyze}
          disabled={loading || !code.trim()}
        >
          {loading ? 'Analyzing...' : 'Analyze Complexity'}
        </button>

        {result && (
          <div className="mt-6 bg-white/10 text-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Result</h2>
            <p><strong>Time Complexity:</strong> {result.timeComplexity}</p>
            <p><strong>Space Complexity:</strong> {result.spaceComplexity}</p>
            <p className="mt-2"><strong>Explanation:</strong></p>
            <pre className="bg-gray-300 p-2 rounded text-sm text-gray-800 whitespace-pre-wrap">
              {result.explanation}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
