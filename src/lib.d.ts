// TODO - should probably submit this to DefinitelyTyped
declare module "parse-link-header" {
    var parseApi: parseApi.ParseLinkHeaderApi;
    namespace parseApi {
        interface ParseLinkHeaderApi {
            (linkHeader: string): { [R in LinkRel]?: LinkHeader };
        }
        interface LinkHeader {
            page: string;
            per_page: string;
            rel: LinkRel;
            url: string;
            pet: string;
        }
        type LinkRel = "next" | "last" | "first" | "prev";
    }
    export = parseApi;
}
