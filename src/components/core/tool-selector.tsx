"use client";

import { useState } from "react";
import { Search, X, Plus, Check, PenToolIcon as Tool } from "lucide-react";
import { availableTools } from "@/constants/toolList";

// Update the interface to use indices
interface ToolSelectorProps {
  selectedTools: number[]; // Indices of selected tools
  onAddTool: (toolIndex: number) => void;
  onRemoveTool: (toolIndex: number) => void;
  onClearTools?: () => void; // Optional for the agent/[id] page
  compact?: boolean; // Optional prop to control display density
}

export function ToolSelector({
  selectedTools,
  onAddTool,
  onRemoveTool,
  onClearTools,
  compact = false,
}: ToolSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  // Filter tools based on search query only, not on selection status
  const filteredTools = availableTools.filter((tool) => {
    // Filter based on search query
    const query = searchQuery.toLowerCase();
    if (tool)
      return (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
      );
  });

  // Helper function to get tool name from index
  const getToolName = (toolIndex: number) => {
    const tool = availableTools[toolIndex];
    return tool ? tool.name : `Tool ${toolIndex}`;
  };

  return (
    <div className={compact ? "" : "mb-8"}>
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-[#252525] border border-[#2a2a2a] rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500/30 transition-all duration-300 text-white shadow-sm"
        />
      </div>

      {/* Selected Tools Display */}
      {selectedTools.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-white">
              Selected Tools ({selectedTools.length})
            </h3>
            {onClearTools && (
              <button
                type="button"
                onClick={onClearTools}
                className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300 bg-[#252525] px-3 py-1.5 rounded-md hover:bg-[#2a2a2a]"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedTools.map((toolIndex) => (
              <div
                key={`selected-${toolIndex}`}
                className="bg-[#252525] text-white text-sm px-3 py-1.5 rounded-lg flex items-center border border-[#2a2a2a]"
              >
                <Tool size={14} className="mr-1.5 text-rose-400" />
                {getToolName(toolIndex)}
                <button
                  type="button"
                  onClick={() => onRemoveTool(toolIndex)}
                  className="ml-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar mt-6">
        {filteredTools.map((tool) => {
          const actualIndex = availableTools.indexOf(tool);
          const isSelected = selectedTools.includes(actualIndex);
          const isHovered = hoveredTool === actualIndex;

          if (!tool) {
            return <></>;
          }

          return (
            <button
              key={actualIndex}
              type="button"
              className={`w-full text-left relative p-5 rounded-xl border transition-all duration-300 
                ${
                  isSelected
                    ? "bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20 hover:border-rose-500/50"
                    : "bg-[#252525] border-[#2a2a2a] hover:bg-[#2a2a2a]"
                }`}
              onClick={() => {
                if (isSelected) {
                  onRemoveTool(actualIndex);
                } else {
                  onAddTool(actualIndex);
                }
              }}
              onMouseEnter={() => setHoveredTool(actualIndex)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className={`font-medium mb-2 transition-colors duration-300 ${
                      isSelected ? "text-rose-400" : "text-white"
                    }`}
                  >
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </div>
                {!compact && (
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 
                      ${
                        isSelected
                          ? "bg-rose-400/20 border border-rose-400/30"
                          : isHovered
                          ? "bg-[#2a2a2a] border border-[#3a3a3a]"
                          : "bg-[#2a2a2a] border border-[#3a3a3a]"
                      }`}
                  >
                    {isSelected ? (
                      <Check
                        size={14}
                        className={`text-rose-400 ${
                          isHovered ? "scale-110" : ""
                        } transition-transform duration-300`}
                      />
                    ) : (
                      <Plus
                        size={14}
                        className={`${
                          isHovered
                            ? "text-rose-400 scale-110"
                            : "text-gray-400"
                        } transition-all duration-300`}
                      />
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
