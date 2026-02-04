
import React, { useState } from 'react';
import { generateCreativeContent } from '../../services/geminiService';

const GrokModule: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [genre, setGenre] = useState('Hài hước');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const genres = ['Hài hước', 'Kinh dị', 'Tình cảm', 'Hành động', 'Khoa học viễn tưởng', 'Chính kịch'];

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    try {
      const content = await generateCreativeContent(idea, genre);
      setResult(content || null);
    } catch (error) {
      console.error(error);
      alert('Không thể tạo nội dung sáng tạo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
          <span>✍️</span> Biên kịch & Ngôn ngữ tự nhiên
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.map(g => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                genre === g ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Nhập ý tưởng kịch bản, truyện ngắn hoặc bài đăng mạng xã hội..."
          className="w-full h-40 p-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading || !idea}
            className="px-8 py-2.5 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-200 disabled:opacity-50"
          >
            {loading ? 'Đang sáng tác...' : 'Tạo tác phẩm'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border animate-fadeIn relative">
          <div className="absolute top-4 right-4 text-xs font-bold text-slate-300 uppercase italic">
            {genre} Genre
          </div>
          <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700 leading-relaxed font-serif text-lg italic">
            {result}
          </div>
          <div className="mt-8 pt-6 border-t flex justify-end gap-3">
             <button 
              onClick={() => {
                const blob = new Blob([result], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'kich-ban-ai.txt';
                a.click();
              }}
              className="text-sm font-bold text-slate-500 hover:text-purple-600"
             >
               Lưu file .txt
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrokModule;
