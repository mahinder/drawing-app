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

export type ResizeHandle =
  | "nw"
  | "ne"
  | "sw"
  | "se"
  | "n"
  | "s"
  | "e"
  | "w"
  | null;

export interface ResizeHandleInfo {
  position: Point;
  type: ResizeHandle;
}
