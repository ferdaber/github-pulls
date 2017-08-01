import { PathHelper } from "../util/path-helper";
import * as request from "request";
import * as linkParse from "parse-link-header";

export class GithubApi implements IGitApi {
    private baseUrl = "https://api.github.com";
    private userAgent = "OrgApi";
    private defaultOptions: request.CoreOptions = {
        headers: {
            "User-Agent": this.userAgent
        }
    };
    private defaultMaxPages = 5;

    constructor(public orgName: string) {}

    /**
     * Gets repos for a certain organization
     */
    public getReposAsync(): Promise<IRepoDTO[]> {
        const path = PathHelper.addPaths(this.baseUrl, "orgs", this.orgName, "repos");
        return new Promise((resolve, reject) => {
            request(path, this.defaultOptions, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const repoList = JSON.parse(body) as IRepoDTO[];
                    resolve(repoList);
                } else {
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
    public getRepoPullsAsync(repoName: string, maxPages?: number, openOnly?: boolean): Promise<IPullRequestDTO[]> {
        let path = PathHelper.addPaths(this.baseUrl, "repos", this.orgName, repoName, "pulls");
        path = !openOnly ? PathHelper.addQueryParams(path, { state: "all" }) : path;
        return new Promise((resolve, reject) => {
            this.getMultiplePages([] as IPullRequestDTO[], resolve, reject, path, maxPages || this.defaultMaxPages);
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
    private getMultiplePages<T>(
        collection: T[],
        resolve: (value?: T[] | PromiseLike<T[]>) => void,
        reject: (reason?: any) => void,
        path: string,
        maxPages?: number
    ): void {
        //If the max number of pages is reached, just resolve the promise
        if (maxPages != null && maxPages < 1) {
            resolve(collection);
            return;
        }
        request(path, this.defaultOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let noMoreData = true;
                //add data to the collection before deciding to continue requests
                collection = collection.concat(JSON.parse(body) as T[]);
                //GitHub uses link headers to lead you to the next pages, use link parse to parse the object out
                if (typeof response.headers.link === "string") {
                    const linkHeaders = linkParse(response.headers.link as string);
                    if (linkHeaders.next) {
                        noMoreData = false;
                        this.getMultiplePages(
                            collection,
                            resolve,
                            reject,
                            linkHeaders.next.url,
                            maxPages && maxPages - 1
                        );
                    }
                }
                if (noMoreData) {
                    resolve(collection);
                }
            } else {
                reject(error);
            }
        });
    }
}
