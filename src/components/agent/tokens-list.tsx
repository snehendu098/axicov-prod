interface Token {
  name: string
  balance: string
  value: string
  icon: string
}

interface TokensListProps {
  tokens: Token[]
}

export function TokensList({ tokens }: TokensListProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden hover:border-rose-500/30 transition-all duration-300">
      <div className="p-5 border-b border-[#2a2a2a] flex justify-between items-center">
        <h2 className="text-lg font-medium">Agent Tokens</h2>
        <div className="text-xs px-2 py-1 rounded-full bg-[#252525] text-gray-400 border border-[#2a2a2a]">
          {tokens.length} tokens
        </div>
      </div>

      <div className="divide-y divide-[#2a2a2a]">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="p-4 flex items-center justify-between hover:bg-[#252525] transition-colors duration-300 group"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center mr-4 border border-[#2a2a2a] group-hover:scale-110 transition-transform duration-300">
                <span className="text-lg">{token.icon}</span>
              </div>
              <div>
                <div className="font-medium group-hover:text-rose-400 transition-colors duration-300">{token.name}</div>
                <div className="text-sm text-gray-400">
                  {token.balance} {token.name}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-rose-400">{token.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

