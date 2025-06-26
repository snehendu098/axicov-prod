import { GridBackground } from "@/components/core/grid-background";

export default function AgentInfoLoading() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GridBackground />
      </div>

      {/* Simple Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-[120px] z-0" />

      {/* Loading UI */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex items-center mb-8 bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a]">
          <div className="w-10 h-10 rounded-full bg-[#252525] animate-pulse"></div>
          <div className="h-8 w-48 bg-[#252525] rounded-md ml-4 animate-pulse"></div>
          <div className="ml-auto flex space-x-2">
            <div className="w-10 h-10 rounded-full bg-[#252525] animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-[#252525] animate-pulse"></div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-4 animate-pulse"
                >
                  <div className="h-4 w-24 bg-[#252525] rounded mb-2"></div>
                  <div className="h-6 w-16 bg-[#252525] rounded"></div>
                </div>
              ))}
            </div>

            {/* Security Card */}
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden">
              <div className="p-4 border-b border-[#2a2a2a]">
                <div className="h-6 w-32 bg-[#252525] rounded animate-pulse"></div>
              </div>

              <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center animate-pulse"
                  >
                    <div className="h-4 w-24 bg-[#252525] rounded"></div>
                    <div className="h-4 w-48 bg-[#252525] rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tokens List */}
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden">
              <div className="p-4 border-b border-[#2a2a2a]">
                <div className="h-6 w-32 bg-[#252525] rounded animate-pulse"></div>
              </div>

              <div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-4 border-b border-[#2a2a2a] flex justify-between animate-pulse"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#252525] mr-3"></div>
                      <div>
                        <div className="h-4 w-16 bg-[#252525] rounded mb-2"></div>
                        <div className="h-3 w-24 bg-[#252525] rounded"></div>
                      </div>
                    </div>
                    <div className="h-4 w-20 bg-[#252525] rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden">
              <div className="p-5 border-b border-[#2a2a2a]">
                <div className="h-6 w-48 bg-[#252525] rounded animate-pulse"></div>
              </div>

              <div className="p-5 space-y-6">
                {/* Description */}
                <div className="bg-[#252525] rounded-xl p-5 border border-[#2a2a2a]">
                  <div className="h-4 w-32 bg-[#2a2a2a] rounded mb-3 animate-pulse"></div>
                  <div className="space-y-2 animate-pulse">
                    <div className="h-4 w-full bg-[#2a2a2a] rounded"></div>
                    <div className="h-4 w-full bg-[#2a2a2a] rounded"></div>
                    <div className="h-4 w-3/4 bg-[#2a2a2a] rounded"></div>
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-5 w-40 bg-[#252525] rounded animate-pulse"></div>
                    <div className="h-8 w-20 bg-[#252525] rounded animate-pulse"></div>
                  </div>
                  <div className="h-64 w-full bg-[#252525] rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
