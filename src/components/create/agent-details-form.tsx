"use client";

import { useRef, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface AgentDetailsFormProps {
  name: string;
  description: string;
  systemMessage: string;
  responseStyle: number;
  showPreview: boolean;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onSystemMessageChange: (systemMessage: string) => void;
  onResponseStyleChange: (responseStyle: number) => void;
  onTogglePreview: (showPreview: boolean) => void;
  onAddExampleMarkdown: () => void;
}

export function AgentDetailsForm({
  name,
  description,
  systemMessage,
  responseStyle,
  showPreview,
  onNameChange,
  onDescriptionChange,
  onSystemMessageChange,
  onResponseStyleChange,
  onTogglePreview,
  onAddExampleMarkdown,
}: AgentDetailsFormProps) {
  const sliderRef = useRef<HTMLInputElement>(null);

  // Update slider background when value changes
  useEffect(() => {
    updateSliderBackground();
  }, [responseStyle]);

  // Function to update the slider's background
  const updateSliderBackground = () => {
    if (sliderRef.current) {
      const value = Number(responseStyle);
      const percentage = (value / 100) * 100;

      // Create gradient background that shows progress
      sliderRef.current.style.background = `linear-gradient(to right, #3b82f6 0%, #e11d48 ${percentage}%, #252525 ${percentage}%, #252525 100%)`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Name & Description */}
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Agent Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full px-4 py-3 bg-[#252525] border border-[#2a2a2a] rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500/30 transition-all duration-300 text-white shadow-sm"
            placeholder="e.g., Research Assistant"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full px-4 py-3 bg-[#252525] border border-[#2a2a2a] rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500/30 transition-all duration-300 text-white shadow-sm"
            placeholder="e.g., Helps with research tasks and finding information"
            required
          />
        </div>
      </div>

      {/* Response Style */}
      <div className="bg-[#252525] rounded-xl p-6 border border-[#2a2a2a]">
        <div className="flex justify-between items-center mb-4">
          <label
            htmlFor="responseStyle"
            className="block text-sm font-medium text-white"
          >
            Response Style
          </label>
          <span className="text-sm px-4 py-1 rounded-full bg-[#1a1a1a] text-gray-300 border border-[#2a2a2a]">
            {responseStyle <= 25
              ? "Very Professional"
              : responseStyle <= 50
              ? "Professional"
              : responseStyle <= 75
              ? "Balanced"
              : "Friendly"}
          </span>
        </div>
        <div className="mt-4 mb-4 px-1">
          <input
            ref={sliderRef}
            type="range"
            id="responseStyle"
            name="responseStyle"
            min="0"
            max="100"
            value={responseStyle}
            onChange={(e) => onResponseStyleChange(Number(e.target.value))}
            className="slider-colored w-full h-2 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 px-1 mt-3">
            <span className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
              Professional
            </span>
            <span className="flex items-center">
              Friendly
              <span className="inline-block w-2 h-2 rounded-full bg-rose-400 ml-1"></span>
            </span>
          </div>
        </div>
      </div>

      {/* Agent Instructions */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label
            htmlFor="systemMessage"
            className="block text-sm font-medium text-white"
          >
            Agent Instructions
          </label>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="inline-flex items-center text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300 bg-[#252525] px-3 py-1.5 rounded-md"
            >
              <HelpCircle size={12} className="mr-1.5" />
              <span>Markdown supported</span>
            </button>
            <button
              type="button"
              onClick={onAddExampleMarkdown}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors duration-300 bg-rose-400/10 px-3 py-1.5 rounded-md hover:bg-rose-400/20"
            >
              Insert example
            </button>
          </div>
        </div>

        <div className="bg-[#252525] rounded-xl border border-[#2a2a2a] overflow-hidden">
          <div className="flex border-b border-[#2a2a2a]">
            <button
              type="button"
              className={`flex-1 px-4 py-2 text-sm transition-colors duration-200 ${
                !showPreview
                  ? "bg-[#1a1a1a] text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => onTogglePreview(false)}
            >
              Edit
            </button>
            <button
              type="button"
              className={`flex-1 px-4 py-2 text-sm transition-colors duration-200 ${
                showPreview
                  ? "bg-[#1a1a1a] text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => onTogglePreview(true)}
            >
              Preview
            </button>
          </div>

          <div className="relative">
            {showPreview ? (
              <div className="w-full px-8 py-6 min-h-[250px] text-white overflow-y-auto custom-scrollbar shadow-inner">
                {systemMessage ? (
                  <article className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{systemMessage}</ReactMarkdown>
                  </article>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] text-center">
                    <div className="text-gray-500 italic mb-2">
                      No content to preview
                    </div>
                    <div className="text-xs text-gray-600">
                      Write some markdown in the editor to see it rendered here
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <textarea
                id="systemMessage"
                name="systemMessage"
                value={systemMessage}
                onChange={(e) => onSystemMessageChange(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 bg-transparent border-0 focus:outline-none focus:ring-0 text-white font-mono text-sm shadow-inner"
                placeholder="You are a helpful assistant that..."
                required
              />
            )}
          </div>
        </div>
        <p className="text-xs text-gray-400">
          Define how your agent should behave, what knowledge it should have,
          and how it should respond.
        </p>
      </div>
    </div>
  );
}
