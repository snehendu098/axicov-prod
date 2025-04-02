"use client";

interface CreateNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCancel: () => void;
}

export function CreateNavigation({
  activeTab,
  onTabChange,
  onCancel,
}: CreateNavigationProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] shadow-xl overflow-hidden sticky top-8">
      <div className="p-4 border-b border-[#2a2a2a]">
        <h2 className="text-lg font-medium text-white">Agent Setup</h2>
        <p className="text-xs text-gray-400 mt-1">Complete all sections</p>
      </div>

      <div className="p-2">
        <button
          type="button"
          onClick={() => onTabChange("details")}
          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center ${
            activeTab === "details"
              ? "bg-rose-500/10 text-rose-400"
              : "text-gray-300 hover:bg-[#252525]"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-medium ${
              activeTab === "details"
                ? "bg-rose-500 text-white"
                : "bg-[#252525] text-gray-400 border border-[#2a2a2a]"
            }`}
          >
            1
          </div>
          <div>
            <div className="font-medium">Agent Details</div>
            <div className="text-xs text-gray-400">
              Name, description & instructions
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("tools")}
          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center mt-2 ${
            activeTab === "tools"
              ? "bg-rose-500/10 text-rose-400"
              : "text-gray-300 hover:bg-[#252525]"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-medium ${
              activeTab === "tools"
                ? "bg-rose-500 text-white"
                : "bg-[#252525] text-gray-400 border border-[#2a2a2a]"
            }`}
          >
            2
          </div>
          <div>
            <div className="font-medium">Tools & Capabilities</div>
            <div className="text-xs text-gray-400">Select agent abilities</div>
          </div>
        </button>
      </div>

      <div className="p-4 mt-4 border-t border-[#2a2a2a]">
        <button
          type="button"
          onClick={onCancel}
          className="w-full px-4 py-2.5 border border-[#2a2a2a] rounded-xl text-gray-300 hover:bg-[#252525] transition-all duration-300 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
