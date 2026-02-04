
import React, { useState } from 'react';
import { generateImage } from '../../services/geminiService';

const NanoBananaModule: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImage(null);
    try {
      const url = await generateImage(prompt);
      setImage(url);
    } catch (error) {
      console.error(error);
      alert('Không thể tạo hình ảnh. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
          <span>🎨</span> Mô tả hình ảnh sáng tạo
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ví dụ: Một con hổ mặc áo phi hành gia trong không gian đầy màu sắc..."
            className="flex-1 p-3.5 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Đang tạo...' : 'Tạo ảnh'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border shadow-sm">
           <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
           <p className="mt-4 text-slate-500 font-medium">Đang vẽ bức tranh của bạn...</p>
        </div>
      )}

      {image && !loading && (
        <div className="bg-white p-4 rounded-2xl shadow-sm border overflow-hidden">
          <img src={image} alt="Generated" className="w-full rounded-xl" />
          <div className="mt-4 flex justify-between items-center px-2">
            <span className="text-sm text-slate-400">Được tạo bởi AI Studio</span>
            <a 
              href={image} 
              download="ai-image.png"
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
              Tải ảnh về
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NanoBananaModule;
