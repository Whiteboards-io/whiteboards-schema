export type FreeDraw = {
    id: string;
    /**
     * @description x position relative to (0, 0) which is the board center
     */
    x: number;
    /**
     * @description y position relative to (0, 0) which is the board center
     */
    y: number;
    width: number;
    height: number;
    /**
     * @description represents an array of Points with (x, y) coordinates
     */
    path: Point [];
    /**
     * @description the drawing line color.
     * @default the unique color assigned to the current user
     */
    color?: string;
    /**
     * @default transparent
     */
    fillColor?: string;
    /**
     * @minimum 1
     * @maximum 20
     * @default 1
     */
    thickness?: number;
}

type Point = [
    x: number,
    y: number
]