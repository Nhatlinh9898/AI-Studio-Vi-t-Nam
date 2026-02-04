
import React, { useState } from 'react';
import { searchAndResearch } from '../../services/geminiService';
import { SearchResult } from '../../types';

const PerplexityModule: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await searchAndResearch(query);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert('Không tìm thấy thông tin phù hợp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
          <span>🔍</span> Tra cứu thông tin chuyên sâu
        </h3>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Nhập câu hỏi hoặc chủ đề bạn muốn nghiên cứu..."
            className="w-full p-4 pr-16 bg-slate-50 border rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none shadow-inner"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query}
            className="absolute right-2 top-2 bottom-2 px-4 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors disabled:opacity-50"
          >
            {loading ? '...' : '🔍'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center py-12">
          <div className="flex gap-1">
             <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce"></div>
             <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
             <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
          <p className="mt-4 text-slate-500 text-sm italic">Đang thu thập dữ liệu từ các nguồn tin cậy...</p>
        </div>
      )}

      {result && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border space-y-6 animate-fadeIn">
          <div>
            <h4 className="text-cyan-700 font-bold uppercase text-xs tracking-widest mb-4">Tóm tắt nghiên cứu</h4>
            <div className="text-slate-700 leading-relaxed text-lg font-medium">
              {result.text}
            </div>
          </div>

          {result.sources.length > 0 && (
            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mb-3">Nguồn tham khảo</h4>
              <div className="flex flex-wrap gap-2">
                {result.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-cyan-600 transition-all"
                  >
                    <span>🔗</span> {source.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PerplexityModule;
