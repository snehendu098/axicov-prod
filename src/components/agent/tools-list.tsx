"use client";

import { useState } from "react";
import { Edit3, Save, X, PenToolIcon as Tool } from "lucide-react";
import { ToolSelector } from "@/components/core/tool-selector";
import { availableTools } from "@/constants/toolList";

interface ToolsListProps {
  tools: number[]; // Changed from string[] to number[]
  onSaveTools: (tools: number[]) => void; // Changed from tools: string[] to tools: number[]
}

export function ToolsList({ tools, onSaveTools }: ToolsListProps) {
  const [editingTools, setEditingTools] = useState(false);
  const [editedTools, setEditedTools] = useState<number[]>(tools);

  const handleSaveTools = () => {
    onSaveTools(editedTools);
    setEditingTools(false);
  };

  const handleAddTool = (toolIndex: number) => {
    if (!editedTools.includes(toolIndex)) {
      setEditedTools((prev) => [...prev, toolIndex]);
    }
  };

  const handleRemoveTool = (toolIndex: number) => {
    setEditedTools((prev) => prev.filter((idx) => idx !== toolIndex));
  };

  // Helper function to get tool name from index
  const getToolName = (toolIndex: number) => {
    if (toolIndex > 1) {
      const tool = availableTools[toolIndex];
      return tool ? tool?.name : `Tool ${toolIndex}`;
    }
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden hover:border-rose-500/30 transition-all duration-300">
      <div className="p-5 border-b border-[#2a2a2a] flex justify-between items-center">
        <h2 className="text-lg font-medium">Agent Tools</h2>
        {!editingTools ? (
          <button
            onClick={() => setEditingTools(true)}
            className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-rose-400 transition-colors bg-[#252525] hover:bg-[#2a2a2a] px-3 py-1.5 rounded-lg border border-[#2a2a2a]"
          >
            <Edit3 size={14} />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingTools(false);
                setEditedTools([...tools]);
              }}
              className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors bg-[#252525] hover:bg-[#2a2a2a] px-3 py-1.5 rounded-lg border border-[#2a2a2a]"
            >
              <X size={14} />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSaveTools}
              className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-rose-400 transition-colors bg-[#252525] hover:bg-[#2a2a2a] px-3 py-1.5 rounded-lg border border-[#2a2a2a]"
            >
              <Save size={14} />
              <span>Save</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-5">
        {editingTools ? (
          // Edit mode - use the core ToolSelector component
          <ToolSelector
            selectedTools={editedTools.filter((item) => item > 1)}
            onAddTool={handleAddTool}
            onRemoveTool={handleRemoveTool}
            compact={true}
          />
        ) : (
          // Display mode - just show the tools with premium styling
          <div className="flex flex-wrap gap-3">
            {tools.map(
              (toolIndex) =>
                toolIndex > 1 && (
                  <div
                    key={toolIndex}
                    className="px-4 py-2 bg-[#252525] text-rose-400 rounded-xl text-sm flex items-center border border-[#2a2a2a] hover:border-rose-500/30 transition-all duration-300 group"
                  >
                    <Tool
                      size={14}
                      className="mr-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    {getToolName(toolIndex)}
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
