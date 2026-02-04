
import React, { useState } from 'react';
import { generateVideo } from '../../services/geminiService';

const Veo3Module: React.FC = () => {
  const [script, setScript] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!script.trim()) return;
    
    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }

    setLoading(true);
    setVideoUrl(null);
    try {
      const url = await generateVideo(script, 'veo-3.1-generate-preview');
      setVideoUrl(url);
    } catch (error: any) {
      console.error(error);
      alert('Lỗi khi tạo video chuyên nghiệp. Kiểm tra API key của bạn.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
          <span>🎬</span> Veo 3 - Sản xuất video chuyên nghiệp
        </h3>
        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Nhập kịch bản chi tiết hoặc ý tưởng phim ngắn của bạn..."
          className="w-full h-40 p-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-rose-500 outline-none mb-4"
        />
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400 italic">Mẹo: Mô tả ánh sáng và góc máy để có kết quả tốt hơn.</span>
          <button
            onClick={handleGenerate}
            disabled={loading || !script}
            className="px-8 py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 shadow-lg shadow-rose-100 disabled:opacity-50"
          >
            {loading ? 'Đang kết xuất video...' : 'Sản xuất Video'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="p-20 bg-white rounded-2xl border shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 border-8 border-rose-100 border-t-rose-600 rounded-full animate-spin"></div>
          <p className="mt-8 text-slate-700 font-bold text-xl">Đang tạo thước phim của bạn</p>
          <div className="mt-4 space-y-2 text-center text-slate-400 text-sm">
            <p>🔄 Đang phân tích kịch bản...</p>
            <p>🖼️ Đang tạo khung hình 1080p...</p>
            <p>🎞️ Đang xử lý chuyển động AI...</p>
          </div>
        </div>
      )}

      {videoUrl && (
        <div className="bg-white p-6 rounded-2xl border shadow-sm animate-fadeIn">
          <h4 className="font-bold text-slate-800 mb-4">Thành phẩm từ Veo 3:</h4>
          <video src={videoUrl} controls className="w-full rounded-xl shadow-2xl bg-black" />
          <div className="mt-6 flex justify-end">
             <a href={videoUrl} download="pro-video.mp4" className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition-all">
                Tải Video 1080p
             </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Veo3Module;
