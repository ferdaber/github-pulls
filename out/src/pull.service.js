"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PullService {
    constructor(gitApi) {
        this.gitApi = gitApi;
    }
    /**
     * Gets all pull requests (open and closed) for a certain repository
     * @param repoName The name of the repository
     */
    getPullsAsync(repoName) {
        return this.gitApi.getRepoPullsAsync(repoName);
    }
    /**
     * Gets all pull requests for an organization, categorized by repository
     */
    getAllPullsAsync() {
        return this.gitApi.getReposAsync().then(repos => {
            let promises = repos.map(repo => {
                return this.gitApi.getRepoPullsAsync(repo.name).then(pulls => {
                    return { repoName: repo.name, pulls };
                });
            });
            return Promise.all(promises).then(pullMaps => {
                const orgPulls = {};
                pullMaps.forEach(pullMap => {
                    orgPulls[pullMap.repoName] = pullMap.pulls;
                });
                return orgPulls;
            });
        });
    }
}
exports.PullService = PullService;
//# sourceMappingURL=pull.service.js.map