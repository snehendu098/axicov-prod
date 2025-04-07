"use client";

import { Settings, Plus, MessageSquare, Info, Zap } from "lucide-react";
import { GridBackground } from "@/components/core/grid-background";
import { AxicovLogo } from "@/components/core/axicov-logo";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ThirdwebConnectButton } from "../thirdweb";
import { useActiveAccount } from "thirdweb/react";
import axios from "axios";
import toast from "react-hot-toast";

// Update the sample agent data colors
const sampleAgents = [
  {
    id: 1,
    name: "Research Assistant",
    description:
      "Helps with research tasks, finding information, and summarizing content.",
    color: "from-blue-500 to-rose-500",
  },
  {
    id: 2,
    name: "Code Helper",
    description:
      "Assists with coding problems, debugging, and providing code examples.",
    color: "from-amber-500 to-rose-500",
  },
  {
    id: 3,
    name: "Content Writer",
    description:
      "Creates and edits various types of content based on your requirements.",
    color: "from-rose-500 to-pink-500",
  },
];

// Update the component name
export default function AgentHome() {
  const [isHovered, setIsHovered] = useState(false);
  const [hasAgents, setHasAgents] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [agents, setAgents] = useState([]);
  const account = useActiveAccount();

  useEffect(() => {
    setMounted(true);

    // Add overflow-hidden to body when no agents to prevent scrollbar
    if (!hasAgents) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [hasAgents]);

  const getAllAgents = async () => {
    try {
      toast.promise(
        async () => {
          const { data } = await axios.get(
            `/api/agents/all?ownerWallet=${account?.address}`
          );
          if (data.success) {
            setAgents(data.data);
            setHasAgents(data.data.length > 0);
          }
        },
        {
          loading: "Loading agents...",
          success: "Agents fetched successfully",
          error: "Error fetching agents",
        }
      );
    } catch (error) {
      console.error("Error fetching agents:", error);
      setHasAgents(false);
    }
  };

  useEffect(() => {
    if (account?.address) {
      getAllAgents();
    }
  }, [account?.address]);

  return (
    <div
      className={`min-h-screen bg-[#121212] text-white flex flex-col items-center relative ${
        !hasAgents ? "overflow-hidden h-screen" : "overflow-x-hidden"
      } font-sans`}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 z-0">
        <GridBackground />
      </div>

      {/* Simple Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-[120px] z-0" />

      {/* Logo - Taking 50% of screen height */}
      <div
        className={`flex items-center justify-center h-[45vh] w-full z-10 relative transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <AxicovLogo />
      </div>

      {/* Tabs and Content - Taking remaining height */}
      <div
        className={`w-full max-w-6xl px-4 pb-8 z-10 relative transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${!hasAgents ? "h-[55vh] flex flex-col" : ""}`}
      >
        <div className="flex mb-6 justify-between items-center">
          {/* Conditional UI: Show "Create Agent" button only when agents exist */}
          {hasAgents ? (
            <>
              <Link href="/create">
                <button className="flex items-center px-6 py-2.5 rounded-full bg-gray-800 border border-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-700 group">
                  <Plus
                    size={16}
                    className="mr-2 text-rose-400 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="font-medium">Create Agent</span>
                </button>
              </Link>
            </>
          ) : null}
          {account?.address && <ThirdwebConnectButton />}
        </div>

        {hasAgents ? (
          // Agent Cards Grid - Create New Agent card removed
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sampleAgents.map((agent) => (
              <MinimalistAgentCard
                key={agent.id}
                id={agent.id}
                name={agent.name}
                description={agent.description}
                color={agent.color}
              />
            ))}
          </div>
        ) : (
          // Empty State - with flex-grow to take available space
          <div className="flex-grow flex flex-col items-center justify-center py-8 px-6 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] shadow-sm transition-all duration-500">
            <div className="bg-gray-700 p-5 rounded-full mb-8">
              <Settings className="text-rose-400 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-white">
              No Agents Found
            </h2>
            <p className="text-gray-400 text-center mb-10 max-w-md">
              Create your own agent to customize actions & instructions
            </p>

            {account?.address && (
              <Link href="/create">
                <button
                  className={`relative bg-rose-500 text-white rounded-lg px-8 py-3.5 font-medium transition-all duration-300 overflow-hidden group ${
                    isHovered ? "pl-12" : "pl-8"
                  }`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span
                    className={`absolute left-0 top-0 h-full flex items-center transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 translate-x-4"
                        : "opacity-0 -translate-x-4"
                    }`}
                  >
                    <Zap size={20} className="animate-pulse" />
                  </span>
                  <span
                    className={`transition-all duration-300 ${
                      isHovered ? "translate-x-2" : "translate-x-0"
                    }`}
                  >
                    Create Agent
                  </span>
                </button>
              </Link>
            )}

            {!account?.address && <ThirdwebConnectButton />}
          </div>
        )}
      </div>
    </div>
  );
}

// Refined minimalist card with always-visible icons
function MinimalistAgentCard({ id, name, description, color }: any) {
  return (
    <div className="group">
      <div className="relative bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6 transition-all duration-300 hover:border-rose-500/30 overflow-hidden group-hover:translate-y-[-2px] h-full flex flex-col">
        {/* Card content */}
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-rose-300 transition-colors duration-300">
            {name}
          </h3>

          <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-6 relative z-10 flex justify-end space-x-3">
          {/* Info button */}
          <Link href={`/agent/${id}`}>
            <button className="inline-flex items-center justify-center rounded-full bg-gray-700 p-2 text-gray-400 hover:text-rose-400 transition-all duration-300 hover:bg-gray-600 cursor-pointer">
              <Info size={16} />
            </button>
          </Link>

          {/* Chat button */}
          <Link href={`/agent/${id}/chat`}>
            <button className="inline-flex items-center justify-center rounded-full bg-rose-500/10 p-2 text-rose-400 transition-all duration-300 hover:bg-rose-500/20 cursor-pointer">
              <MessageSquare size={16} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
