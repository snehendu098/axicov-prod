import { GridBackground } from "@/components/core/grid-background";

export default function ChatLoading() {
  return (
    <div className="min-h-screen h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Grid Background with increased opacity */}
      <div className="absolute inset-0 z-0 opacity-70">
        <GridBackground />
      </div>

      {/* Subtle glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-400/5 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] z-0" />

      {/* Loading UI */}
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-4 backdrop-blur-sm border border-gray-800/30">
            <div className="w-8 h-8 border-2 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400">Loading chat...</p>
        </div>
      </div>
    </div>
  );
}
