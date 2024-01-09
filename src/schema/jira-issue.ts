export type JiraIssue = {
    id: string;
    /**
     * @description x position relative to (0, 0) which is the board center
     */
    /**
     * @description Jira issue id.
     */
    issueId: string;
    /**
     * @description Jira site id.
     */
    siteId: string
    x: number;
    /**
     * @description y position relative to (0, 0) which is the board center
     */
    y: number;
    width: number;
    height: number;
    /**
     * @description the background color of the card.
     * @default white (#FFF)
     */
    color?: string;
    /**
     * @default black (#000)
     */
    textColor?: string;
}
