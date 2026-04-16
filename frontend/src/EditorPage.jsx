import React from 'react';
import Editor from './components/Editor';
import Chat from './components/Chat';
import './EditorStyles.css'; 
const EditorPage = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8F9FA]">
      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        {/* Google-Style Header */}
        <header className="h-[64px] bg-white flex items-center justify-between px-4 shrink-0 z-20 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {/* Document Icon */}
            <div className="p-2 bg-blue-600 rounded-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-[18px] font-medium text-[#3C4043] leading-none mb-1">DOCUMENT EDITOR</h1>
             
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Room link copied!");
              }}
              className="flex items-center gap-2 px-6 py-2 bg-[#C2E7FF] text-[#001D35] rounded-full text-sm font-semibold hover:shadow-md transition-all active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              </svg>
              Share
            </button>
            <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">
              S
            </div>
          </div>
        </header>
        
        {/* The Scrollable Canvas */}
        <main className="workspace-container custom-scrollbar">
          {/* This wrapper provides the "centered paper" look */}
          <div className="w-full flex justify-center py-8">
            <Editor />
          </div>
        </main>
      </div>

      {/* Chat Sidebar */}
      <aside className="w-[320px] h-full border-l border-[#DADCE0] bg-white z-30 flex-shrink-0 shadow-[-4px_0_15px_rgba(0,0,0,0.03)]">
        <Chat />
      </aside>
    </div>
  );
};

export default EditorPage;