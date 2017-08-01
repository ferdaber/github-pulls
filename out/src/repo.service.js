"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepoService {
    constructor(gitApi) {
        this.gitApi = gitApi;
    }
    /**
     * Gets all repositories with a certain organization
     */
    getReposAsync() {
        //right now this works because IRepo is a subset of IRepoDTO
        return this.gitApi.getReposAsync();
    }
}
exports.RepoService = RepoService;
//# sourceMappingURL=repo.service.js.map