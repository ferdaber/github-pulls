import { GithubApi } from "../../src/data-access/github-api";
//proably not a great way to build unit tests with a test runner... could easily hit github rate limit
// describe("Github API for lodash", () => {
//     let api = new GithubApi("lodash");

//     it("gets repositories correctly", done => {
//         api.getReposAsync().then(repos => {
//             expect(repos.length).toBeGreaterThan(0);
//             done();
//         });
//     });

//     it("gets pulls for the lodash repo correctly", done => {
//         api.getRepoPullsAsync("lodash", 1).then(pulls => {
//             expect(pulls.length).toBeGreaterThan(0);
//             done();
//         });
//     });
// });
