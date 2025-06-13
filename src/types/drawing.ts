export interface Point {
  x: number;
  y: number;
}

export interface DrawingElement {
  id: string;
  type: "rectangle" | "circle" | "line";
  startPoint: Point;
  endPoint: Point;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  strokeStyle: "solid" | "dashed" | "dotted";
  selected: boolean;
}

export type Tool = "select" | "rectangle" | "circle" | "line";

export interface DrawingProperties {
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  strokeStyle: "solid" | "dashed" | "dotted";
}

