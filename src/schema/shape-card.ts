import { Card } from "./card";

export type ShapeCard = Card & {
    /**
     * @default true, can be only true
     */
    shape: boolean;
    /**
     * @description the type of shape, can be one of the Basic shapes or the Flowchart shape
     * @default  "square" (rectangle)
     */
    shapeType?: BasicShapes | FlowchartShapes | null;
    /**
     * @description the color of the card's border.
     * @default the background color of the card (property 'color') for Basic shapes; required black (#000) for Flowchart
     */
    borderColor?: string| null;
    /**
     * @description disable card shadows, should be set to 'true' for better visual effect
     */
    shadowDisabled: boolean;
};

type BasicShapes = "square" | "triangle" | "circle" | "heart" | "rounded" | "trapez" | "diamond" | "star" | "arrowLeft" | "arrow" | "arrowUp" | "arrowDown";

type FlowchartShapes = "process"
    | "decision"
    | "terminator"
    | "predefinedProcess"
    | "document"
    | "multipleDocuments"
    | "manualInput"
    | "preparation"
    | "data"
    | "database"
    | "hardDisk"
    | "internalStorage"
    | "paperTape"
    | "manualOperation"
    | "delay"
    | "storedData"
    | "merge"
    | "connector"
    | "or"
    | "summingJunction"
    | "display"
    | "offPageLink"
    | "curlyBraceRight"
    | "curlyBraceLeft"
    | "braceLeft";
