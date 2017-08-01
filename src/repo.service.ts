export class RepoService {
    constructor(private gitApi: IGitApi) {}

    /**
     * Gets all repositories with a certain organization
     */
    public getReposAsync(): Promise<IRepo[]> {
        //right now this works because IRepo is a subset of IRepoDTO
        return this.gitApi.getReposAsync();
    }
}
