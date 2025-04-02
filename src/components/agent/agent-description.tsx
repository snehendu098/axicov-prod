interface AgentDescriptionProps {
  description: string
}

export function AgentDescription({ description }: AgentDescriptionProps) {
  return (
    <div className="bg-[#252525] rounded-xl p-5 border border-[#2a2a2a]">
      <h3 className="text-md font-medium mb-3 text-white">Description</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  )
}

