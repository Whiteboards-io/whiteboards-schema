export type Card = {
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
     * @description the background color of the card. If you're looking for our 'sticky-note-like' yellow, it's #FFF1AB
     * @default the unique color assigned to the current user
     */
    color?: string;
    /**
     * @default black (#000)
     */
    textColor?: string;
    textStyle?: CardTextStyle | null;
    /**
     * @description Plain string, does not allow for HTML tags
     */
    text?: string;
    /**
     * @default null (which means auto)
     */
    fontSize?: number | null;
    /**
     * @default 0
     * @description 0 = center, 1 = left, 2 = right
     */
    textAlign?: TextAlign;
    /**
     * @default 0
     * @description 0 = middle, 1 = left, 2 = right
     */
    textVerticalAlign?: TextVerticalAlign;
}

export enum TextAlign {
    CENTER = 0,
    LEFT = 1,
    RIGHT = 2
}

export enum TextVerticalAlign {
    MIDDLE = 0,
    TOP = 1,
    BOTTOM = 2
}

export type CardTextStyle = {
    bold?: boolean | null | undefined;
    italic?: boolean | null | undefined;
    underline?: boolean | null | undefined;
    strike?: boolean | null | undefined;
};



