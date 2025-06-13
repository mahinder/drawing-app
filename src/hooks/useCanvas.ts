import { useRef, useCallback, useState } from "react";
import { Point, DrawingElement } from "../types/drawing";

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<DrawingElement | null>(
    null
  );

  const getMousePos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): Point => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    []
  );

  const drawElement = useCallback(
    (ctx: CanvasRenderingContext2D, element: DrawingElement) => {
      const {
        type,
        startPoint,
        endPoint,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeStyle,
        selected,
      } = element;

      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = fillColor;
      ctx.lineWidth = strokeWidth;

      // Set line dash pattern
      switch (strokeStyle) {
        case "dashed":
          ctx.setLineDash([10, 5]);
          break;
        case "dotted":
          ctx.setLineDash([2, 3]);
          break;
        default:
          ctx.setLineDash([]);
      }

      switch (type) {
        case "rectangle":
          const width = endPoint.x - startPoint.x;
          const height = endPoint.y - startPoint.y;
          ctx.fillRect(startPoint.x, startPoint.y, width, height);
          ctx.strokeRect(startPoint.x, startPoint.y, width, height);
          break;

        case "circle":
          const centerX = (startPoint.x + endPoint.x) / 2;
          const centerY = (startPoint.y + endPoint.y) / 2;
          const radius =
            Math.sqrt(
              Math.pow(endPoint.x - startPoint.x, 2) +
                Math.pow(endPoint.y - startPoint.y, 2)
            ) / 2;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
          break;

        case "line":
          ctx.beginPath();
          ctx.moveTo(startPoint.x, startPoint.y);
          ctx.lineTo(endPoint.x, endPoint.y);
          ctx.stroke();
          break;
      }

      // Draw selection outline
      if (selected) {
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 1;

        const minX = Math.min(startPoint.x, endPoint.x) - 5;
        const minY = Math.min(startPoint.y, endPoint.y) - 5;
        const maxX = Math.max(startPoint.x, endPoint.x) + 5;
        const maxY = Math.max(startPoint.y, endPoint.y) + 5;

        ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
      }
    },
    []
  );

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach((element) => drawElement(ctx, element));
  }, [elements, drawElement]);

  //*
  // Actions
  //  *//
  const clearCanvas = useCallback(() => {
    setElements([]);
    setSelectedElement(null);
  }, []);

  const loadState = useCallback(() => {
    const state = localStorage.getItem("drawing-state");
    if (state) {
      setElements(JSON.parse(state));
      alert("Drawing state loaded!");
    }
  }, []);

  return {
    canvasRef,
    getMousePos,
    drawElement,
    redrawCanvas,
    setElements,
    elements,
    selectedElement,
    setSelectedElement,
    clearCanvas,
    loadState
  };
};
