"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { GridBackground } from "@/components/core/grid-background";
import Link from "next/link";
import { AgentHeader } from "@/components/agent/agent-header";
import { StatsCards } from "@/components/agent/stats-cards";
import { SecurityCard } from "@/components/agent/security-card";
import { ToolsList } from "@/components/agent/tools-list";
import { AgentDetailsCard } from "@/components/agent/agent-details-card";
import axios from "axios";
import { useActiveAccount } from "thirdweb/react";
import { Agent } from "@/utils/agent";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function AgentInfoPage() {
  const params = useParams();
  const agentId = params.id as string;
  const [agent, setAgent] = useState<any>();
  const [mounted, setMounted] = useState(false);
  const [agentAccount, setAgentAccount] = useState({
    address: "",
    amount: "",
  });

  const account = useActiveAccount();
  const router = useRouter();

  useEffect(() => {
    fetchAgentParams();
  }, []);

  const fetchAgentParams = async () => {
    try {
      toast.loading("Fetching agent details...");
      const { data } = await axios.get(
        `/api/chats/${agentId}?ownerWallet=${account?.address}`
      );

      if (data.success) {
        setAgent(data.data.agent);

        const agent = new Agent(data.data.agent.privateKey);
        const agentAddress = await agent.account.address;
        const agentAmount = await agent.getBalance();

        setAgentAccount({
          address: agentAddress,
          amount: agentAmount.displayValue,
        });
        setMounted(true);
        toast.success("Agent details fetched successfully");
      } else {
        router.push("/");
        setMounted(false);
        toast.error("Agent not found");
      }
    } catch (err: any) {
      console.log(err);
      router.push("/");
      setMounted(false);
      toast.error("Agent not found");
    }
  };

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
        <AgentHeader agentName={agent?.displayName} agentId={agentId} />

        {/* Main Content - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Stats and Tokens */}
          <div className="lg:col-span-5 space-y-6">
            {/* Stats Cards */}
            <StatsCards
              funds={agentAccount.amount}
              toolsCount={agent.tools.length - 2}
            />

            {/* Security Card */}
            <SecurityCard
              publicKey={agentAccount?.address.toString() || ""}
              privateKey={agent?.privateKey}
              createdOn={format(agent?.createdAt, "dd MMM y")}
            />

            {/* Tokens List
            <TokensList tokens={agent.tokens} /> */}

            {/* Tools List */}
            <ToolsList tools={agent?.tools} onSaveTools={handleSaveTools} />
          </div>

          {/* Right Column - About Agent */}
          <AgentDetailsCard
            agentName={agent?.displayName}
            agentId={agentId}
            description={agent?.description}
            instructions={agent?.instructions}
            onSaveInstructions={handleSaveInstructions}
          />
        </div>
      </div>
    </div>
  );
}
