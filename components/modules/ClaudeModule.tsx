
import React, { useState } from 'react';
import { generateCode } from '../../services/geminiService';

const ClaudeModule: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const languages = ['javascript', 'python', 'typescript', 'java', 'csharp', 'php', 'go', 'rust'];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const code = await generateCode(prompt, language);
      setResult(code || null);
    } catch (error) {
      console.error(error);
      alert('Lỗi hệ thống khi sinh mã nguồn.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>💻</span> Yêu cầu lập trình
          </h3>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded-lg bg-slate-50 text-sm font-medium outline-none"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ví dụ: Viết một function bằng JS để lấy ngày hiện tại định dạng DD/MM/YYYY..."
          className="w-full h-32 p-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Đang viết mã...' : 'Sinh mã nguồn'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl shadow-xl overflow-x-auto">
          <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-3">
            <span className="text-xs font-mono uppercase text-slate-400">Generated {language} code</span>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(result);
                alert('Đã copy mã nguồn!');
              }}
              className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors"
            >
              Sao chép code
            </button>
          </div>
          <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ClaudeModule;
