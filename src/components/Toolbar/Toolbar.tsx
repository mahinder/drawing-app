import React from "react";
import { Square, Circle, Minus, MousePointer } from "lucide-react";
import { Tool } from "../../types/drawing";

interface ToolbarProps {
  currentTool: Tool;
  setCurrentTool: (tool: Tool) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ currentTool, setCurrentTool }) => {
  return (
    <div className="flex items-center space-x-3">
      <h3 className="text-sm font-medium text-gray-900">Tools:</h3>
      <div className="flex space-x-2">
        <button
          onClick={() => setCurrentTool("select")}
          className={`p-2 rounded-lg border-2 flex items-center space-x-2 ${
            currentTool === "select"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <MousePointer className="w-4 h-4" />
          <span className="text-sm">Select</span>
        </button>
        <button
          onClick={() => setCurrentTool("rectangle")}
          className={`p-2 rounded-lg border-2 flex items-center space-x-2 ${
            currentTool === "rectangle"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Square className="w-4 h-4" />
          <span className="text-sm">Rectangle</span>
        </button>
        <button
          onClick={() => setCurrentTool("circle")}
          className={`p-2 rounded-lg border-2 flex items-center space-x-2 ${
            currentTool === "circle"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Circle className="w-4 h-4" />
          <span className="text-sm">Circle</span>
        </button>
        <button
          onClick={() => setCurrentTool("line")}
          className={`p-2 rounded-lg border-2 flex items-center space-x-2 ${
            currentTool === "line"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Minus className="w-4 h-4" />
          <span className="text-sm">Line</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
