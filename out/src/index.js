"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pull_service_1 = require("./pull.service");
const repo_service_1 = require("./repo.service");
const github_api_1 = require("./data-access/github-api");
// poor man's dependency injection by using constructors
const orgName = "lodash", api = new github_api_1.GithubApi(orgName), repoService = new repo_service_1.RepoService(api), pullService = new pull_service_1.PullService(api);
repoService
    .getReposAsync()
    .then(repos => {
    if (repos.length) {
        console.log(`${orgName}'s repositories:`);
        repos.forEach(repo => console.log(`[${repo.id}] ${repo.name}: ${repo.description}`));
    }
})
    .catch(reason => console.log("Could not get repos, service returned: " + reason));
pullService
    .getAllPullsAsync()
    .then(orgPulls => {
    if (Object.keys(orgPulls).length) {
        console.log(`${orgName}'s pull requests:`);
        for (const repo in orgPulls) {
            console.log(`${repo}: ${orgPulls[repo].length} pulls`);
        }
    }
})
    .catch(reason => console.log("Could not get pull requests, service returned: " + reason));
//# sourceMappingURL=index.js.map