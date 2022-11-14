export type Line = {
    id: string;
    /**
     * @description id of the card where the line starts
     */
    startCardId?: string;
    /**
     * @description id of the card where the line starts
     */
    endCardId?: string;
    /**
     * @description start point coordinates if the line does not start at a card, relative to (0,0)
     */
    start?: { x: number; y: number };
    /**
     * @description end point coordinates if the line does not start at a card, relative to (0,0)
     */
    end?: { x: number; y: number };
    /**
     * @description the text that appears above the line
     */
    text?: string;
    color: string;
    /**
     * @minimum 1
     * @maximum 20
     * @default 2
     */
    thickness?: number;
    /**
     * @description if true, will display the arrow at the start of the line
     */
    arrowLeft?: boolean;
    /**
     * @description if true, will display the arrow at the end of the line
     */
    arrowRight?: boolean;
    type: "line" | "step" | "stepBefore" | "stepAfter" | "curve";
    /**
     * @description only applicable if type is "curve"
     */
    curveType?: "curve-catmull-rom";
    /**
     * @default solid
     */
    style?: "solid" | "dashed" | "dotted"
};