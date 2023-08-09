import { DraggableId } from "react-beautiful-dnd";

interface Combine {
  draggableId: string;
  droppableId: string;
}

interface DraggableLocation {
  droppableId: string;
  index: number;
}

export interface DragResult {
  reason: "DROP" | "CANCEL";
  destination?: DraggableLocation;
  source: DraggableLocation;
  combine?: Combine;
  mode: "FLUID" | "SNAP";
  draggableId: DraggableId;
}
