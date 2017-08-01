export class PullService {
    constructor(private gitApi: IGitApi) {}

    /**
     * Gets all pull requests (open and closed) for a certain repository
     * @param repoName The name of the repository
     */
    public getPullsAsync(repoName: string): Promise<IPullRequest[]> {
        return this.gitApi.getRepoPullsAsync(repoName);
    }

    /**
     * Gets all pull requests for an organization, categorized by repository
     */
    public getAllPullsAsync(): Promise<IOrganizationPullRequests> {
        return this.gitApi.getReposAsync().then(repos => {
            let promises = repos.map(repo => {
                return this.gitApi.getRepoPullsAsync(repo.name).then(pulls => {
                    return { repoName: repo.name, pulls };
                });
            });
            return Promise.all(promises).then(pullMaps => {
                const orgPulls: IOrganizationPullRequests = {};
                pullMaps.forEach(pullMap => {
                    orgPulls[pullMap.repoName] = pullMap.pulls;
                });
                return orgPulls;
            });
        });
    }
}
