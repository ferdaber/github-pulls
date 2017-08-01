"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_helper_1 = require("../../src/util/path-helper");
describe("Path helper methods", () => {
    it("appends to base paths with a trailing slash", () => {
        expect(path_helper_1.PathHelper.addPaths("base/", "foo", "bar")).toBe("base/foo/bar");
    });
    it("appends to paths with a leading slash", () => {
        expect(path_helper_1.PathHelper.addPaths("base", "/foo", "/bar", "/hello/world")).toBe("base/foo/bar/hello/world");
    });
    it("prevents doubling up of separators", () => {
        expect(path_helper_1.PathHelper.addPaths("base/", "/foo/", "/bar/")).toBe("base/foo/bar/");
    });
    it("adds query params correclty", () => {
        const param = {
            foo: "hey",
            bar: "hello"
        };
        expect(path_helper_1.PathHelper.addQueryParams("base", param)).toBe("base?foo=hey&bar=hello");
    });
    it("adds to existing query params", () => {
        const param1 = {
            foo: "hey"
        }, param2 = {
            bar: "hello"
        };
        expect(path_helper_1.PathHelper.addQueryParams(path_helper_1.PathHelper.addQueryParams("base", param1), param2)).toBe("base?foo=hey&bar=hello");
    });
    it("escapes URI characters correctly when adding query params", () => {
        const param = {
            foo: "&heya="
        };
        expect(path_helper_1.PathHelper.addQueryParams("base", param)).toBe("base?foo=%26heya%3D");
    });
});
//# sourceMappingURL=path-helper.spec.js.map