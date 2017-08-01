"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pull_service_1 = require("../src/pull.service");
describe("Pull request service", () => {
    const mockApi = jasmine.createSpyObj("IGitApi", ["getReposAsync", "getRepoPullsAsync"]), pullService = new pull_service_1.PullService(mockApi);
    it("Gets all org pull requests correctly", done => {
        mockApi.getReposAsync.and.returnValue(Promise.resolve([{ name: "repo-one" }, { name: "repo-two" }]));
        mockApi.getRepoPullsAsync.and.returnValue(Promise.resolve([{ number: 1 }, { number: 2 }]));
        pullService.getAllPullsAsync().then(orgPulls => {
            expect(Object.keys(orgPulls).length).toBe(2);
            expect(orgPulls["repo-one"].length + orgPulls["repo-two"].length).toBe(4);
            done();
        });
    });
});
//# sourceMappingURL=pull.service.spec.js.map