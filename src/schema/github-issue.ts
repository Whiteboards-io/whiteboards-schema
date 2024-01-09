export type GithubIssue = {
    id: string;
    /**
     * @description required properties for githubIssue card.
     */
    githubIssueKey: GithubIssueKey;
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
     * @description the background color of the card.
     * @default white (#FFF)
     */
    color?: string;
    /**
     * @default black (#000)
     */
    textColor?: string;
}

type GithubIssueKey = {
    issue_number: number,
    owner: string,
    repo: string,
    title: string
}
