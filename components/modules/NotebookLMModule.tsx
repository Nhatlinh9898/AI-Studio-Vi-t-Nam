
import React, { useState } from 'react';
import { summarizeAndCategorize } from '../../services/geminiService';

const NotebookLMModule: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const summary = await summarizeAndCategorize(inputText);
      setResult(summary || null);
    } catch (error) {
      console.error(error);
      alert('Đã xảy ra lỗi khi xử lý tài liệu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
          <span>📚</span> Nhập tài liệu của bạn
        </h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Dán văn bản hoặc tài liệu bạn muốn tóm tắt và phân loại tại đây..."
          className="w-full h-48 p-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleProcess}
            disabled={loading || !inputText}
            className={`px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2 ${loading && 'opacity-50 cursor-not-allowed'}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Đang xử lý...
              </span>
            ) : 'Tóm tắt & Phân loại'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border animate-slideUp">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Kết quả phân tích</h3>
            <button 
               onClick={() => {
                 navigator.clipboard.writeText(result);
                 alert('Đã sao chép vào bộ nhớ tạm!');
               }}
               className="text-blue-600 text-sm font-medium hover:underline"
            >
              Sao chép kết quả
            </button>
          </div>
          <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600 leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotebookLMModule;
