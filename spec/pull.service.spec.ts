import { PullService } from "../src/pull.service";
describe("Pull request service", () => {
    const mockApi = jasmine.createSpyObj("IGitApi", ["getReposAsync", "getRepoPullsAsync"]),
        pullService = new PullService(mockApi);

    it("Gets all org pull requests correctly", done => {
        mockApi.getReposAsync.and.returnValue(
            Promise.resolve([{ name: "repo-one" }, { name: "repo-two" }] as IRepoDTO[])
        );
        mockApi.getRepoPullsAsync.and.returnValue(Promise.resolve([{ number: 1 }, { number: 2 }] as IPullRequestDTO[]));
        pullService.getAllPullsAsync().then(orgPulls => {
            expect(Object.keys(orgPulls).length).toBe(2);
            expect(orgPulls["repo-one"].length + orgPulls["repo-two"].length).toBe(4);
            done();
        });
    });
});
