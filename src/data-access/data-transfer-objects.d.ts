/**
 * JSON spec for the repository DTO, right now only contains the bare minimum data elements for the exercise
 */
interface IRepoDTO {
    id: number;
    name: string;
    full_name: string;
    pulls_url: string;
    description: string;
}

/**
 * JSON spec for the pull request DTO, right now only contains the bare minimum data elements for the exercise
 */
interface IPullRequestDTO {
    id: number;
    url: string;
    number: number;
    state: "open" | "closed";
    created_at: string;
    updated_at: string;
    closed_at: string;
    merged_at: string;
    title: string;
}
