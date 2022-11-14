export type ImageCard = {
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
     * @description The original width of the image
     */
    originalWidth?: number;
    /**
     * @description The original height of the image
     */
    originalHeight?: number;
    /**
     * @description If present, the image will be referenced from Board.blobs
     */
    dataBlob?: string;
    /**
     * @description If present, the image will be read from data url
     */
    dataURL?: string;
}