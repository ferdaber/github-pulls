import { PullService } from "./pull.service";
import { RepoService } from "./repo.service";
import { GithubApi } from "./data-access/github-api";

// poor man's dependency injection by using constructors
const orgName = "lodash",
    api = new GithubApi(orgName),
    repoService = new RepoService(api),
    pullService = new PullService(api);

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
