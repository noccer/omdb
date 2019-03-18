import Axios, { AxiosRequestConfig } from 'axios';
import { SearchQuery, PlotType, SearchResult } from '../models/OMDBModels';

const baseUrl = 'http://www.omdbapi.com';

const page = 1; // TODO
const plot = PlotType.short;

const baseConfig: AxiosRequestConfig = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
};

class OMDBService {
    public static async search(queries: SearchQuery): Promise<SearchResult> {
        const { s, t, y, apiKey } = queries;
        const params: SearchQuery = {
            apiKey,
            s,
            t,
            y,
            page,
            plot,
        };
        const response = await Axios.get(baseUrl, {
            ...baseConfig,
            params,
        });
        return response.data;
    }
}

export default OMDBService;
