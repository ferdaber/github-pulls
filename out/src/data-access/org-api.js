"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_helper_1 = require("../util/path-helper");
const request = require("request");
const linkParse = require("parse-link-header");
class GithubApi {
    constructor(orgName) {
        this.orgName = orgName;
        this.baseUrl = "https://api.github.com";
        this.userAgent = "OrgApi";
        this.defaultOptions = {
            headers: {
                "User-Agent": this.userAgent
            }
        };
        this.maxPages = 5;
    }
    /**
     * Gets repos for a certain organization
     */
    getReposAsync() {
        const path = path_helper_1.PathHelper.addPaths(this.baseUrl, "orgs", this.orgName, "repos");
        return new Promise((resolve, reject) => {
            request(path, this.defaultOptions, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const repoList = JSON.parse(body);
                    resolve(repoList);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    /**
     * Gets pull requests from a repository. Defaults to getting ALL pull requests, even closed ones
     * @param repoName The name of the GitHub repository
     * @param openOnly Only get open pull requests
     */
    getRepoPullsAsync(repoName, openOnly) {
        let path = path_helper_1.PathHelper.addPaths(this.baseUrl, "repos", this.orgName, repoName, "pulls");
        path = !openOnly ? path_helper_1.PathHelper.addQueryParams(path, { state: "all" }) : path;
        return new Promise((resolve, reject) => {
            this.getMultiplePages([], resolve, reject, path, this.maxPages);
        });
    }
    /**
     * Get multiple pages for paginated results from GitHub. The default page size is 30.
     * This method recursively calls itself until all pages are retrieved or the max number of pages is reached
     * GitHub limits unauthenticated requests to 60
     * @param collection The collection to add to with each page that returns
     * @param resolve Resolve callback for the Promise
     * @param reject Reject callback for the Promise
     * @param path The path to make the request to
     * @param maxPages Max number of pages to grab, leave undefined or null to get all pages
     */
    getMultiplePages(collection, resolve, reject, path, maxPages) {
        //If the max number of pages is reached, just resolve the promise
        if (maxPages != null && maxPages < 1) {
            resolve(collection);
            return;
        }
        request(path, this.defaultOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let noMoreData = true;
                //add data to the collection before deciding to continue requests
                collection = collection.concat(JSON.parse(body));
                //GitHub uses link headers to lead you to the next pages, use link parse to parse the object out
                if (typeof response.headers.link === "string") {
                    const linkHeaders = linkParse(response.headers.link);
                    if (linkHeaders.next) {
                        noMoreData = false;
                        this.getMultiplePages(collection, resolve, reject, linkHeaders.next.url, maxPages && maxPages - 1);
                    }
                }
                if (noMoreData) {
                    resolve(collection);
                }
            }
            else {
                reject(error);
            }
        });
    }
}
exports.GithubApi = GithubApi;
//# sourceMappingURL=org-api.js.map