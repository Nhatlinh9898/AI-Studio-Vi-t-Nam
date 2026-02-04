
import React, { useState, useEffect } from 'react';
import { AIModule } from './types';
import Sidebar from './components/Sidebar';
import NotebookLMModule from './components/modules/NotebookLMModule';
import HeyGenModule from './components/modules/HeyGenModule';
import NanoBananaModule from './components/modules/NanoBananaModule';
import ClaudeModule from './components/modules/ClaudeModule';
import Veo3Module from './components/modules/Veo3Module';
import ElevenLabsModule from './components/modules/ElevenLabsModule';
import GrokModule from './components/modules/GrokModule';
import NotionModule from './components/modules/NotionModule';
import PerplexityModule from './components/modules/PerplexityModule';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<AIModule>(AIModule.NotebookLM);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderModule = () => {
    switch (activeModule) {
      case AIModule.NotebookLM: return <NotebookLMModule />;
      case AIModule.HeyGen: return <HeyGenModule />;
      case AIModule.NanoBanana: return <NanoBananaModule />;
      case AIModule.Claude: return <ClaudeModule />;
      case AIModule.Veo3: return <Veo3Module />;
      case AIModule.ElevenLabs: return <ElevenLabsModule />;
      case AIModule.Grok: return <GrokModule />;
      case AIModule.Notion: return <NotionModule />;
      case AIModule.Perplexity: return <PerplexityModule />;
      default: return <NotebookLMModule />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Mobile Toggle */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 fixed md:relative z-50 w-72 h-full`}>
        <Sidebar activeModule={activeModule} onSelectModule={setActiveModule} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 glass-effect border-b px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {activeModule.toUpperCase()} Studio
            </h1>
          </div>
          <div className="hidden sm:block text-slate-500 text-sm">
            Công cụ AI Đa Năng Cho Người Việt
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto h-full">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
