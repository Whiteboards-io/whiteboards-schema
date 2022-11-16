import { Card } from "./card";

export type Text = Card & {
    /**
     * @description "Text" under the hood is just a regular card, but it has this additional property to ensure some effects are disabled
     */
    textOnly: boolean;
};



