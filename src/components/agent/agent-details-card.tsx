import Link from "next/link"
import { MessageSquare } from "lucide-react"
import { AgentDescription } from "./agent-description"
import { InstructionsEditor } from "./instructions-editor"

interface AgentDetailsCardProps {
  agentName: string
  agentId: string
  description: string
  instructions: string
  onSaveInstructions: (instructions: string) => void
}

export function AgentDetailsCard({
  agentName,
  agentId,
  description,
  instructions,
  onSaveInstructions,
}: AgentDetailsCardProps) {
  return (
    <div className="lg:col-span-7">
      <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden hover:border-rose-500/30 transition-all duration-300">
        <div className="p-5 border-b border-[#2a2a2a]">
          <h2 className="text-xl font-semibold text-white">About {agentName}</h2>
        </div>

        <div className="p-5 space-y-6">
          {/* Agent Description */}
          <AgentDescription description={description} />

          {/* Agent Instructions */}
          <InstructionsEditor instructions={instructions} onSaveInstructions={onSaveInstructions} />
        </div>

        <div className="p-4 border-t border-[#2a2a2a] bg-[#1a1a1a]">
          <p className="text-xs text-gray-500">
            Agent information is provided for informational purposes only. Axicov makes no representation as to the
            accuracy of the information.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end">
        <Link href={`/agent/${agentId}/chat`}>
          <button className="px-6 py-3 rounded-xl bg-rose-500 text-white font-medium hover:bg-rose-600 transition-all duration-300 flex items-center gap-2">
            <MessageSquare size={18} />
            <span>Chat with Agent</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

