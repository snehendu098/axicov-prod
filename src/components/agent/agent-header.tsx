import Link from "next/link";
import { ArrowLeft, MessageSquare, Settings } from "lucide-react";
import { AxicovAvatar } from "@/components/core/axicov-avatar";

interface AgentHeaderProps {
  agentName: string;
  agentId: string;
}

export function AgentHeader({ agentName, agentId }: AgentHeaderProps) {
  return (
    <div className="flex items-center mb-8 bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a] shadow-sm">
      <Link
        href="/"
        className="mr-4 p-2 rounded-full bg-[#252525] hover:bg-[#2a2a2a] transition-colors group"
      >
        <ArrowLeft
          size={20}
          className="text-gray-400 group-hover:text-rose-400 transition-colors"
        />
      </Link>

      <div className="flex items-center">
        <AxicovAvatar size="medium" />
        <div className="ml-3">
          <h1 className="text-2xl font-bold text-white">{agentName}</h1>
          <p className="text-xs text-gray-400">Agent ID: {agentId}</p>
        </div>
      </div>

      <div className="ml-auto flex space-x-3">
        <Link
          href={`/agent/${agentId}/chat`}
          className="p-2.5 rounded-xl bg-[#252525] hover:bg-[#2a2a2a] border border-[#2a2a2a] transition-all duration-300 group shadow-sm"
        >
          <MessageSquare
            size={18}
            className="text-rose-400 group-hover:scale-110 transition-transform duration-300"
          />
        </Link>
        <button className="p-2.5 rounded-xl bg-[#252525] hover:bg-[#2a2a2a] border border-[#2a2a2a] transition-all duration-300 group shadow-sm">
          <Settings
            size={18}
            className="text-gray-400 group-hover:text-rose-400 group-hover:scale-110 transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
}
