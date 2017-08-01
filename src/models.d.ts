/**
 * Domain-level model interface for repo, could be a class but for now let's leave it as an interface
 * so we can easily extend the DTO with an additional property
 */
interface IRepo {
    id: number;
    name: string;
    description: string;
}

/**
 * Domain-level model interface for a pull request
 */
interface IPullRequest {
    id: number;
    number: number;
    title: string;
    created_at: string;
    updated_at: string;
    closed_at: string;
    merged_at: string;
}

/**
 * Grouper for an organziation's pull requests by repo name
 */
interface IOrganizationPullRequests {
    [repoName: string]: IPullRequest[];
}
