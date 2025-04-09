import { Wallet, PenToolIcon as Tool } from "lucide-react";

interface StatsCardsProps {
  funds: string;
  toolsCount: number;
}

export function StatsCards({ funds, toolsCount }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Total Funds */}
      <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-5 hover:border-rose-500/30 transition-all duration-300 group">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
            <Wallet size={18} className="text-rose-400" />
          </div>
          <span className="text-sm text-gray-400 font-medium">Total funds</span>
        </div>
        <div className="text-2xl font-bold text-white">{funds} EDU</div>
      </div>

      {/* Tools Count */}
      <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-5 hover:border-rose-500/30 transition-all duration-300 group">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
            <Tool size={18} className="text-rose-400" />
          </div>
          <span className="text-sm text-gray-400 font-medium">Tools</span>
        </div>
        <div className="text-2xl font-bold text-white">{toolsCount}</div>
      </div>
    </div>
  );
}
