
import React, { useState } from 'react';
import { generateVideo } from '../../services/geminiService';

const HeyGenModule: React.FC = () => {
  const [text, setText] = useState('');
  const [avatarStyle, setAvatarStyle] = useState('Dân văn phòng');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [needsKey, setNeedsKey] = useState(false);

  const checkAndGenerate = async () => {
    if (!text.trim()) return;
    
    // Check if key is selected as per requirements for Veo models
    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      // Proceed assuming success as per race condition notes
    }

    setLoading(true);
    setVideoUrl(null);
    try {
      const prompt = `Video nhân vật ảo phong cách ${avatarStyle} đang nói nội dung sau: ${text}. Video chất lượng cao, biểu cảm tự nhiên.`;
      const url = await generateVideo(prompt);
      setVideoUrl(url);
    } catch (error: any) {
      console.error(error);
      if (error.message.includes('Requested entity was not found')) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      } else {
        alert('Đã xảy ra lỗi khi tạo video. Đảm bảo bạn đã chọn khóa API trả phí.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
          <span>🎭</span> Tạo video với Avatar ảo
        </h3>
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Chọn phong cách nhân vật</label>
          <div className="flex gap-2">
            {['Nam trẻ trung', 'Nữ hiện đại', 'Dân văn phòng', 'Hoạt hình 3D'].map(style => (
              <button
                key={style}
                onClick={() => setAvatarStyle(style)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  avatarStyle === style ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 border hover:bg-slate-100'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập nội dung nhân vật ảo sẽ phát biểu..."
          className="w-full h-32 p-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
        />
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="text-[10px] text-slate-400 max-w-sm">
            Lưu ý: Tính năng này yêu cầu bạn sử dụng Google Cloud API Key có đăng ký thanh toán.
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-indigo-600 hover:underline ml-1">Tìm hiểu thêm</a>
          </div>
          <button
            onClick={checkAndGenerate}
            disabled={loading || !text}
            className="w-full sm:w-auto px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 disabled:opacity-50"
          >
            {loading ? 'Đang sản xuất video...' : 'Tạo Video HeyGen'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="p-12 bg-white rounded-2xl border shadow-sm flex flex-col items-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-8 text-slate-600 font-bold">Khởi tạo nhân vật ảo...</p>
          <p className="mt-2 text-slate-400 text-xs text-center max-w-xs">Quá trình này có thể mất vài phút. Vui lòng giữ trình duyệt ổn định.</p>
        </div>
      )}

      {videoUrl && (
        <div className="bg-white p-4 rounded-2xl border shadow-sm animate-fadeIn">
          <video src={videoUrl} controls className="w-full rounded-xl shadow-inner aspect-video bg-black" />
          <div className="mt-4 flex justify-between items-center px-2">
            <span className="text-sm font-bold text-slate-400">Nội dung hoàn tất</span>
            <a href={videoUrl} download="ai-avatar-video.mp4" className="text-indigo-600 font-bold text-sm hover:underline">Tải xuống video</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeyGenModule;
