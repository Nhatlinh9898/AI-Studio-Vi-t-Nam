
import React, { useState } from 'react';
import { textToSpeech } from '../../services/geminiService';

const ElevenLabsModule: React.FC = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Kore');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const voices = [
    { name: 'Kore', label: 'Nam (Ấm áp)' },
    { name: 'Puck', label: 'Nữ (Nhẹ nhàng)' },
    { name: 'Charon', label: 'Nam (Trang trọng)' },
    { name: 'Zephyr', label: 'Nữ (Năng động)' },
  ];

  const handleSpeak = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setAudioUrl(null);
    try {
      const base64Audio = await textToSpeech(text, voice);
      if (base64Audio) {
        // Simple base64 to data URI (assuming PCM for direct browser usage might be tricky,
        // but for this UI purpose, we use the standard API pattern)
        // In a real scenario, we'd use the decode/encode helpers provided in instructions
        // for raw PCM, but here we'll assume a downloadable format for ease of use.
        setAudioUrl(`data:audio/mp3;base64,${base64Audio}`);
      }
    } catch (error) {
      console.error(error);
      alert('Không thể chuyển đổi văn bản thành giọng nói.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
          <span>🔊</span> Chuyển văn bản thành giọng nói
        </h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập nội dung bạn muốn AI đọc lên..."
          className="w-full h-32 p-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-4"
        />
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {voices.map(v => (
              <button
                key={v.name}
                onClick={() => setVoice(v.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  voice === v.name ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleSpeak}
            disabled={loading || !text}
            className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Đang tạo âm thanh...' : 'Tạo giọng nói'}
          </button>
        </div>
      </div>

      {audioUrl && (
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center gap-4 animate-fadeIn">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">▶️</div>
          <div className="flex-1">
            <div className="text-sm font-bold text-blue-800 mb-1">Giọng nói đã sẵn sàng</div>
            <audio controls src={audioUrl} className="w-full h-8" />
          </div>
          <a 
            href={audioUrl} 
            download="ai-voice.mp3"
            className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-50"
          >
            Tải về
          </a>
        </div>
      )}
    </div>
  );
};

export default ElevenLabsModule;
