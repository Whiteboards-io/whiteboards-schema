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
     * @default 'sticky-note-like' yellow (#FFF1AB)
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
     * @default auto
     */
    fontSize?: number | null;
};

export type CardTextStyle = {
    bold?: boolean | null | undefined;
    italic?: boolean | null | undefined;
    underline?: boolean | null | undefined;
    strike?: boolean | null | undefined;
};



