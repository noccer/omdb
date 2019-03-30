// Enums
export enum PlotType {
    full = 'full',
    short = 'short',
}
export enum DataType {
    json = 'json',
    xml = 'xml',
}
export enum MediaType {
    movie = 'movie',
    series = 'series',
    episode = 'episode',
}
export enum ResponseType {
    true = 'True',
    false = 'False',
}

// Outgoing
export type SearchQuery = SearchFormModel & BaseQuery;
interface BaseQuery {
    apiKey: string;
    apiUrl: string;
}
export interface SearchFormModel {
    /** Movie title to search for. */
    s: string;
    /** Type of result to return. */
    t?: MediaType;
    /** Year of release. */
    y?: number;
    /** Return short or full plot. */
    plot?: PlotType;
    /** The data type to return. */
    r?: DataType;
    /** Number of results */
    page?: number;
}

// Incoming
export interface SearchResult {
    Search: Search[];
    TotalResults: string;
    Response: ResponseType;
}
export interface Search {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
export interface Rating {
    source: string;
    value: string;
}
