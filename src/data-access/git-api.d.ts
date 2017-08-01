/**
 * Abstraction of a git-like API in case github is no longer the preferred provider
 */
interface IGitApi {
    orgName: string;
    getReposAsync(): Promise<IRepoDTO[]>;
    getRepoPullsAsync(repoName: string): Promise<IPullRequestDTO[]>;
}
