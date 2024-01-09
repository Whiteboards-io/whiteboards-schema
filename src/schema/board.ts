import { Card, ImageCard, Text, Line, GithubIssue, JiraIssue } from "./";

type AnyCard = Card | ImageCard | Text | GithubIssue | JiraIssue;

export type Board = {
    cards: {
        /**
         * @description Record<string, AnyCard> - for every card present on the board it should map card["id"] -> true
         */
        _index: Record<string, boolean>;
        /**
         * @description Record<string, AnyCard>
         */
        _items: Record<string, AnyCard>;
    };
    lines: {
        /**
         * @description Record<string, boolean> - for every line present on the board it should map line["id"] -> true
         */
        _index: Record<string, boolean>;
        /**
         * @description Record<string, Line>
         */
        _items: Record<string, Line>;
    };
    /**
     * @description Record<string, string> - for every image card, it should map imageCard["dataBlob"] -> url of the image.
     * The URL must contain "#" followed by its mime type, e.g. https://example.com/image.png#image/png
     */
    blobs?: Record<string, string>
}