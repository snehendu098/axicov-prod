import { GridBackground } from "@/components/core/grid-background";

export default function CreateLoading() {
  return (
    <div className="min-h-screen bg-[#121212] text-white relative overflow-x-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GridBackground />
      </div>

      {/* Simple Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-[120px] z-0" />

      {/* Loading Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Loading Spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#2a2a2a] border-t-rose-500 rounded-full animate-spin"></div>
          </div>

          {/* Loading Text */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Loading</h2>
            <p className="text-gray-400">
              Preparing agent creation interface...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
