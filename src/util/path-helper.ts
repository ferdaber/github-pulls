export class PathHelper {
    /**
     * Add paths to a URL without doubling up on slash delimiters
     * @param basePath Base URL to add on to
     * @param paths rest array of new paths to concatenate to the URL
     */
    public static addPaths(basePath: string, ...paths: string[]): string {
        let resultPath = basePath;
        for (const path of paths) {
            if (resultPath.endsWith("/")) {
                resultPath += path.startsWith("/") ? path.substr(1) : path;
            } else {
                resultPath += path.startsWith("/") ? path : "/" + path;
            }
        }
        return resultPath;
    }

    /**
     * Add query parameters to a URL, even if the URL already has query parameters set
     * @param basePath Base URL to add optional query params
     * @param params Dictionary of query parameters to add
     */
    public static addQueryParams(basePath: string, params: { [key: string]: string | number | boolean }): string {
        let resultPath = basePath;
        if (resultPath.indexOf("?") === -1) {
            resultPath += "?";
        } else if (!resultPath.endsWith("&")) {
            resultPath += "&";
        }
        for (const key in params) {
            resultPath += `${key}=${encodeURIComponent("" + params[key])}&`;
        }
        return resultPath.slice(0, -1);
    }
}
