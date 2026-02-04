
import React from 'react';
import { AIModule } from '../types';

interface SidebarProps {
  activeModule: AIModule;
  onSelectModule: (module: AIModule) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onSelectModule }) => {
  const menuItems = [
    { id: AIModule.NotebookLM, icon: '📚', label: 'NotebookLM', desc: 'Hệ thống hóa tri thức' },
    { id: AIModule.HeyGen, icon: '🎭', label: 'HeyGen', desc: 'Avatar ảo & Video' },
    { id: AIModule.NanoBanana, icon: '🎨', label: 'Nano Banana Pro', desc: 'Sáng tạo hình ảnh' },
    { id: AIModule.Claude, icon: '💻', label: 'Claude', desc: 'Lập trình & Code' },
    { id: AIModule.Veo3, icon: '🎬', label: 'Veo 3', desc: 'Sản xuất video pro' },
    { id: AIModule.ElevenLabs, icon: '🔊', label: 'Eleven Labs', desc: 'Giọng nói tự nhiên' },
    { id: AIModule.Grok, icon: '✍️', label: 'Grok', desc: 'Biên kịch & Nội dung' },
    { id: AIModule.Notion, icon: '📈', label: 'Notion', desc: 'Quản trị hiệu suất' },
    { id: AIModule.Perplexity, icon: '🔍', label: 'Perplexity', desc: 'Tra cứu & Nghiên cứu' },
  ];

  return (
    <div className="bg-white h-full border-r shadow-sm flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">AI</div>
          <div>
            <h2 className="font-bold text-slate-800 leading-none">Studio</h2>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">Version 1.0.0</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectModule(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeModule === item.id 
                ? 'bg-blue-50 text-blue-700 shadow-sm' 
                : 'hover:bg-slate-50 text-slate-600'
            }`}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <div className="text-left">
              <div className="font-semibold text-sm leading-none">{item.label}</div>
              <div className="text-[11px] text-slate-400 mt-1">{item.desc}</div>
            </div>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t bg-slate-50">
        <div className="text-[11px] text-slate-400 text-center font-medium">
          Dành riêng cho cộng đồng AI Việt Nam
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
