"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { GridBackground } from "@/components/core/grid-background";
import { Settings, Send } from "lucide-react";
import Link from "next/link";
import { AxicovAvatar } from "@/components/core/axicov-avatar";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useActiveAccount } from "thirdweb/react";
import ChatLoading from "./loading";
import { reactiveAgent } from "@/utils/agent/react";
import { HumanMessage } from "@langchain/core/messages";
import ReactMarkdown from "react-markdown";

type Message = {
  message: string;
  type: "user" | "agent";
};

export default function AgentChatPage() {
  const params = useParams();
  const agentId = params.id as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [mounted, setMounted] = useState(false);
  const [agentData, setAgentData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [agent, setAgent] = useState<any>();
  const [runtimeMessage, setRuntimeMessage] = useState<string>("");

  const account = useActiveAccount();
  const router = useRouter();

  async function fetchAgentData() {
    setLoading(true);
    toast.loading("Loading agent data...");
    try {
      const { data } = await axios.get(
        `/api/chats/${agentId}?ownerWallet=${account?.address}`
      );

      console.log(data);

      if (data.success) {
        toast.dismiss();
        toast.success("Agent data loaded successfully");

        const { agent, chats } = data.data;

        setAgentData(agent);

        const reActAgent = await reactiveAgent({
          privateKey: agent.privateKey,
          info: {
            name: agent.displayName,
            description: agent.description,
            instruction: agent.instructions,
          },
          tools: agent.tools,
        });

        setAgent(reActAgent);
        setMessages(chats);
      } else {
        toast.dismiss();
        toast.error(data.error);
        router.push("/");
      }
    } catch (error: any) {
      toast.dismiss();
      toast.error("Failed to load agent data");
      console.error("Error fetching agent data:", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  // Simulate initial welcome message
  useEffect(() => {
    if (!account?.address) {
      router.push("/");
    }

    if (account?.address) {
      fetchAgentData();
    }

    setMounted(true);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea as content grows
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "24px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    try {
      // Add user message
      const userMessage: Message = {
        message: inputValue,
        type: "user",
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
      setInputValue("");

      await axios.post(
        `/api/chats/${agentId}?ownerWallet=${account?.address}`,
        {
          message: inputValue,
          type: "user",
        }
      );

      const stream = await agent.stream(
        {
          messages: [new HumanMessage(inputValue)],
        },
        {
          configurable: {
            thread_id: agentData._id,
          },
        }
      );

      let rm = [];

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          if (typeof chunk.agent.messages[0].content === "string") {
            const aiMessage: Message = {
              message: chunk.agent.messages[0].content as string,
              type: "agent",
            };

            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
            setRuntimeMessage("");

            await axios.post(
              `/api/chats/${agentId}?ownerWallet=${account?.address}`,
              {
                message: chunk.agent.messages[0].content,
                type: "agent",
                runtimeMessages: rm,
              }
            );

            rm = [];
          } else {
            if (chunk.agent.messages[0].content[0].text) {
              setRuntimeMessage(chunk.agent.messages[0].content[0].text);
              rm.push(chunk.agent.messages[0].content[0].text);
            }
          }
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`Error Occurred: ${error.message}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return !loading ? (
    <div className="min-h-screen h-screen bg-[#121212] text-white flex flex-col relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <GridBackground />
      </div>

      {/* Simple Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-[120px] z-0" />

      {/* Header - Fixed at top */}
      <header className="fixed top-0 left-0 right-0 z-20 border-b border-[#2a2a2a] bg-[#121212]/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center space-x-2">
              <AxicovAvatar size="small" />
              <span className="font-medium text-rose-400">
                {agentData?.displayName || "Axicov Ai"}
              </span>
            </div>
          </div>

          {/* <button className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors">
            <Settings size={16} className="text-gray-400" />
          </button> */}
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-grow flex flex-col relative z-10 w-full overflow-hidden pt-16 pb-32">
        {messages.length === 0 && !isTyping ? (
          <div
            className={`flex-grow flex flex-col items-center justify-center transition-opacity duration-1000 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mb-6">
              <AxicovAvatar size="large" />
            </div>
            <h1 className="text-2xl font-medium text-white mb-2 text-center">
              Can I help you with anything?
            </h1>
            <p className="text-gray-400 text-center max-w-md text-sm">
              I'm {agentData?.displayName || "Axicov Ai"}.{" "}
              {agentData?.description || ""} Let's get started!
            </p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto custom-scrollbar h-full w-full">
            <div className="max-w-5xl mx-auto px-4 w-full">
              <div className="space-y-6 pb-4">
                {messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] prose prose-invert prose-sm md:max-w-[70%] rounded-2xl px-4 py-3 backdrop-blur-sm  ${
                        message.type === "user"
                          ? "bg-rose-500/5 text-white border border-rose-500/20"
                          : "bg-gray-800/50 border border-gray-700"
                      }`}
                    >
                      <ReactMarkdown>{message.message}</ReactMarkdown>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start items-center">
                    <div className="max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 bg-gray-800/50 border border-gray-700">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 rounded-full bg-rose-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-rose-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-rose-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                    <p className="ml-2 text-xs text-white/60 animate-pulse">
                      {runtimeMessage}
                    </p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-[#121212]/90 backdrop-blur-sm pt-2 pb-4 border-t border-[#2a2a2a]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative rounded-xl bg-[#1a1a1a] border border-[#2a2a2a]">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-white resize-none py-4 px-4 pr-12 max-h-32 overflow-y-auto custom-scrollbar"
              style={{ minHeight: "24px" }}
            />

            <div className="absolute right-2 bottom-2 flex items-center">
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  inputValue.trim()
                    ? "bg-rose-500 text-white hover:bg-rose-600"
                    : "bg-gray-700 text-gray-500"
                }`}
              >
                <Send size={14} />
              </button>
            </div>
          </div>

          <div className="text-center mt-3">
            <p className="text-xs text-gray-500">
              Axicov AI may generate inaccurate information. We recommend
              checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ChatLoading />
  );
}
