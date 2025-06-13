import React from "react";
import { Tool } from "../../types/drawing";

interface CanvasProps {
  currentTool: Tool;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const Canvas: React.FC<CanvasProps> = ({
  currentTool,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  canvasRef,
}) => {
  return (
    <div className="flex-1 p-4">
      <div className="bg-white rounded-lg shadow-sm border max-w-fit mx-auto">
        <canvas
          ref={canvasRef}
          width={1000}
          height={600}
          className="border rounded-lg cursor-crosshair"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        />
      </div>
    </div>
  );
};

export default Canvas;
