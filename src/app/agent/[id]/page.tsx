"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { GridBackground } from "@/components/core/grid-background";
import Link from "next/link";
import { AgentHeader } from "@/components/agent/agent-header";
import { StatsCards } from "@/components/agent/stats-cards";
import { SecurityCard } from "@/components/agent/security-card";
import { TokensList } from "@/components/agent/tokens-list";
import { ToolsList } from "@/components/agent/tools-list";
import { AgentDetailsCard } from "@/components/agent/agent-details-card";

// Sample agent data - in a real app, you would fetch this from an API
const agentData: any = {
  "1": {
    name: "Research Assistant",
    description:
      "Helps with research tasks, finding information, and summarizing content.",
    publicKey: "0x5vN...us1m",
    privateKey: "0x7a9b...f3d2",
    instructions:
      "# Research Assistant\n\n## Purpose\nThis agent is designed to help users with research tasks and information gathering.\n\n## Capabilities\n- Search the web for real-time information\n- Analyze data and create visualizations\n- Summarize content from various sources\n\n## Usage Guidelines\nWhen asking for research, try to be specific about:\n1. The topic you're researching\n2. The depth of information needed\n3. Any specific sources you prefer\n\n> Note: This agent works best with clear, focused research questions.",
    createdOn: "12 Feb 2024",
    funds: "669,696.59",
    tools: [0, 2, 3], // Changed from ["web-search", "data-visualization", "summarization"] to indices
    tokens: [
      { name: "ETH", balance: "1.29801", value: "$3,245.67", icon: "🔷" },
      { name: "BTC", balance: "0.07708", value: "$4,982.31", icon: "🟠" },
      { name: "SOL", balance: "45.6123", value: "$5,473.48", icon: "🟣" },
      { name: "USDC", balance: "1,245.78", value: "$1,245.78", icon: "🔵" },
    ],
  },
  "2": {
    name: "Code Helper",
    description:
      "Assists with coding problems, debugging, and providing code examples.",
    publicKey: "0x8rT...kl3n",
    privateKey: "0x5c7d...e9f1",
    instructions:
      "# Code Helper\n\n## Purpose\nThis agent is designed to help with coding tasks, debugging, and explaining programming concepts.\n\n## Capabilities\n- Provide code examples in various languages\n- Debug issues in existing code\n- Explain programming concepts\n\n## Usage Guidelines\nWhen asking for coding help, try to include:\n1. The programming language you're using\n2. Any error messages you're seeing\n3. What you've already tried\n\n```javascript\n// Example code block\nfunction example() {\n  console.log('Hello world');\n}\n```",
    createdOn: "15 Jan 2024",
    funds: "245,123.45",
    tools: [1, 5, 3], // Changed from ["code-interpreter", "file-management", "text-analysis"] to indices
    tokens: [
      { name: "ETH", balance: "0.89432", value: "$2,236.08", icon: "🔷" },
      { name: "BTC", balance: "0.03421", value: "$2,213.65", icon: "🟠" },
      { name: "LINK", balance: "156.78", value: "$1,879.36", icon: "🔗" },
    ],
  },
  "3": {
    name: "Content Writer",
    description:
      "Creates and edits various types of content based on your requirements.",
    publicKey: "0x3pL...mn7r",
    privateKey: "0x2f8e...a4d9",
    instructions:
      "# Content Writer\n\n## Purpose\nThis agent specializes in content creation for various formats and purposes.\n\n## Capabilities\n- Write articles and blog posts\n- Create social media content\n- Edit and proofread existing content\n\n## Usage Guidelines\nWhen requesting content, please specify:\n1. The target audience\n2. The tone (formal, casual, etc.)\n3. Any specific keywords to include\n\n> **Pro tip:** Providing examples of content you like can help get better results.",
    createdOn: "3 Mar 2024",
    funds: "178,456.23",
    tools: [3, 6, 7], // Changed from ["text-analysis", "translation", "summarization"] to indices
    tokens: [
      { name: "ETH", balance: "0.56789", value: "$1,419.73", icon: "🔷" },
      { name: "USDT", balance: "2,345.67", value: "$2,345.67", icon: "💵" },
      { name: "MATIC", balance: "1,234.56", value: "$1,111.10", icon: "🟪" },
    ],
  },
};

export default function AgentInfoPage() {
  const params = useParams();
  const agentId = params.id as string;
  const [agent, setAgent] = useState(agentData["1"]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!agent) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center">
        <div className="text-2xl font-bold mb-4">Agent not found</div>
        <Link href="/" className="text-rose-400 hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleSaveTools = (tools: number[]) => {
    setAgent((prev: any) => ({ ...prev, tools }));
  };

  const handleSaveInstructions = (instructions: string) => {
    setAgent((prev: any) => ({ ...prev, instructions }));
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white relative overflow-x-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GridBackground />
      </div>

      {/* Simple Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-[120px] z-0" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <AgentHeader agentName={agent.name} agentId={agentId} />

        {/* Main Content - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Stats and Tokens */}
          <div className="lg:col-span-5 space-y-6">
            {/* Stats Cards */}
            <StatsCards funds={agent.funds} toolsCount={agent.tools.length} />

            {/* Security Card */}
            <SecurityCard
              publicKey={agent.publicKey}
              privateKey={agent.privateKey}
              createdOn={agent.createdOn}
            />

            {/* Tokens List */}
            <TokensList tokens={agent.tokens} />

            {/* Tools List */}
            <ToolsList tools={agent.tools} onSaveTools={handleSaveTools} />
          </div>

          {/* Right Column - About Agent */}
          <AgentDetailsCard
            agentName={agent.name}
            agentId={agentId}
            description={agent.description}
            instructions={agent.instructions}
            onSaveInstructions={handleSaveInstructions}
          />
        </div>
      </div>
    </div>
  );
}
