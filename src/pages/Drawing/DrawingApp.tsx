import React, { useState, useRef, useEffect, useCallback } from "react";
import { DrawingElement, Point, Tool } from "../../types/drawing";
import Header from "../../components/Header/Header";
import Toolbar from "../../components/Toolbar/Toolbar";
import Canvas from "../../components/Canvas/Canvas";
import { useCanvas } from "../../hooks/useCanvas";

const DrawingApp: React.FC = () => {
  const {
    getMousePos,
    canvasRef,
    drawElement,
    redrawCanvas,
    elements,
    setElements,
    selectedElement,
    setSelectedElement,
    clearCanvas,
    loadState,
  } = useCanvas();

  const [currentTool, setCurrentTool] = useState<Tool>("select");
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 });
  const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });

  // Drawing properties
  const [fillColor, setFillColor] = useState("#3b82f6");
  const [strokeColor, setStrokeColor] = useState("#1e40af");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeStyle, setStrokeStyle] = useState<"solid" | "dashed" | "dotted">(
    "solid"
  );

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const isPointInElement = (point: Point, element: DrawingElement): boolean => {
    const { startPoint, endPoint, type } = element;

    switch (type) {
      case "rectangle":
        return (
          point.x >= Math.min(startPoint.x, endPoint.x) &&
          point.x <= Math.max(startPoint.x, endPoint.x) &&
          point.y >= Math.min(startPoint.y, endPoint.y) &&
          point.y <= Math.max(startPoint.y, endPoint.y)
        );

      case "circle":
        const centerX = (startPoint.x + endPoint.x) / 2;
        const centerY = (startPoint.y + endPoint.y) / 2;
        const radius =
          Math.sqrt(
            Math.pow(endPoint.x - startPoint.x, 2) +
              Math.pow(endPoint.y - startPoint.y, 2)
          ) / 2;
        const distance = Math.sqrt(
          Math.pow(point.x - centerX, 2) + Math.pow(point.y - centerY, 2)
        );
        return distance <= radius;

      case "line":
        const lineThreshold = 5;
        const A = endPoint.y - startPoint.y;
        const B = startPoint.x - endPoint.x;
        const C = endPoint.x * startPoint.y - startPoint.x * endPoint.y;
        const distance_to_line =
          Math.abs(A * point.x + B * point.y + C) / Math.sqrt(A * A + B * B);
        return distance_to_line <= lineThreshold;

      default:
        return false;
    }
  };

  const findElementAtPoint = (point: Point): DrawingElement | null => {
    for (let i = elements.length - 1; i >= 0; i--) {
      if (isPointInElement(point, elements[i])) {
        return elements[i];
      }
    }
    return null;
  };

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  /* 
    Capture mouse events
  */

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const mousePos = getMousePos(e);

    if (currentTool === "select") {
      const clickedElement = findElementAtPoint(mousePos);

      if (clickedElement) {
        setElements((prev) =>
          prev.map((el) => ({ ...el, selected: el.id === clickedElement.id }))
        );
        setSelectedElement(clickedElement);
        setIsDragging(true);
        setDragOffset({
          x: mousePos.x - clickedElement.startPoint.x,
          y: mousePos.y - clickedElement.startPoint.y,
        });
      } else {
        setElements((prev) => prev.map((el) => ({ ...el, selected: false })));
        setSelectedElement(null);
      }
    } else {
      setIsDrawing(true);
      setStartPoint(mousePos);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const mousePos = getMousePos(e);

    if (isDragging && selectedElement) {
      const deltaX = mousePos.x - dragOffset.x - selectedElement.startPoint.x;
      const deltaY = mousePos.y - dragOffset.y - selectedElement.startPoint.y;

      setElements((prev) =>
        prev.map((el) =>
          el.id === selectedElement.id
            ? {
                ...el,
                startPoint: {
                  x: el.startPoint.x + deltaX,
                  y: el.startPoint.y + deltaY,
                },
                endPoint: {
                  x: el.endPoint.x + deltaX,
                  y: el.endPoint.y + deltaY,
                },
              }
            : el
        )
      );

      setSelectedElement((prev) =>
        prev
          ? {
              ...prev,
              startPoint: {
                x: prev.startPoint.x + deltaX,
                y: prev.startPoint.y + deltaY,
              },
              endPoint: {
                x: prev.endPoint.x + deltaX,
                y: prev.endPoint.y + deltaY,
              },
            }
          : null
      );
    } else if (isDrawing && currentTool !== "select") {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      redrawCanvas();

      // Preview the current drawing
      const previewElement: DrawingElement = {
        id: "preview",
        type: currentTool as "rectangle" | "circle" | "line",
        startPoint,
        endPoint: mousePos,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeStyle,
        selected: false,
      };

      drawElement(ctx, previewElement);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing && currentTool !== "select") {
      const mousePos = getMousePos(e);
      const newElement: DrawingElement = {
        id: generateId(),
        type: currentTool as "rectangle" | "circle" | "line",
        startPoint,
        endPoint: mousePos,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeStyle,
        selected: false,
      };

      setElements((prev) => [...prev, newElement]);
    }

    setIsDrawing(false);
    setIsDragging(false);
  };

  const updateSelectedElement = (
    property: keyof DrawingElement,
    value: any
  ) => {
    if (!selectedElement) return;

    setElements((prev) =>
      prev.map((el) =>
        el.id === selectedElement.id ? { ...el, [property]: value } : el
      )
    );

    setSelectedElement((prev) =>
      prev ? { ...prev, [property]: value } : null
    );
  };

  /**
   * 
   * Saving shapes to local storage, can load and download
   */

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const saveState = () => {
    const state = JSON.stringify(elements);
    localStorage.setItem("drawing-state", state);
    alert("Drawing state saved!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header
        onSave={saveState}
        onClear={clearCanvas}
        onExport={saveDrawing}
        onLoad={loadState}
      />

      {/* Toolbar */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-6">
            {/* Tools */}
            <Toolbar
              setCurrentTool={setCurrentTool}
              currentTool={currentTool}
            />

            {/* Properties */}
            <div className="flex items-center space-x-4">
              <h3 className="text-sm font-medium text-gray-900">Properties:</h3>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700">
                  Fill:
                </label>
                <input
                  type="color"
                  value={
                    selectedElement ? selectedElement.fillColor : fillColor
                  }
                  onChange={(e) => {
                    if (selectedElement) {
                      updateSelectedElement("fillColor", e.target.value);
                    } else {
                      setFillColor(e.target.value);
                    }
                  }}
                  className="w-8 h-8 rounded border border-gray-300"
                />
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700">
                  Stroke:
                </label>
                <input
                  type="color"
                  value={
                    selectedElement ? selectedElement.strokeColor : strokeColor
                  }
                  onChange={(e) => {
                    if (selectedElement) {
                      updateSelectedElement("strokeColor", e.target.value);
                    } else {
                      setStrokeColor(e.target.value);
                    }
                  }}
                  className="w-8 h-8 rounded border border-gray-300"
                />
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700">
                  Width:{" "}
                  {selectedElement ? selectedElement.strokeWidth : strokeWidth}
                  px
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={
                    selectedElement ? selectedElement.strokeWidth : strokeWidth
                  }
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (selectedElement) {
                      updateSelectedElement("strokeWidth", value);
                    } else {
                      setStrokeWidth(value);
                    }
                  }}
                  className="w-20"
                />
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700">
                  Style:
                </label>
                <select
                  value={
                    selectedElement ? selectedElement.strokeStyle : strokeStyle
                  }
                  onChange={(e) => {
                    const value = e.target.value as
                      | "solid"
                      | "dashed"
                      | "dotted";
                    if (selectedElement) {
                      updateSelectedElement("strokeStyle", value);
                    } else {
                      setStrokeStyle(value);
                    }
                  }}
                  className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>
            </div>

            {/* Element Info */}
            {selectedElement && (
              <div className="flex items-center space-x-2 text-xs text-gray-600 border-l pl-4">
                <span>Selected: {selectedElement.type}</span>
                <span>ID: {selectedElement.id.slice(0, 6)}...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <Canvas
        currentTool={currentTool}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        canvasRef={canvasRef}
      />
    </div>
  );
};

export default DrawingApp;
