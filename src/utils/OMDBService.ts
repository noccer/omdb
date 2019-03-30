import Axios, { AxiosRequestConfig } from 'axios';
import { SearchQuery, PlotType, SearchResult } from '../models/OMDBModels';

const baseUrl = 'http://localhost:8001';
export const apiUrl = 'http://www.omdbapi.com';

const plot = PlotType.short;

const baseConfig: AxiosRequestConfig = {};

class OMDBService {
    public static async search(queries: SearchQuery): Promise<SearchResult> {
        const { s, t, y, apiKey } = queries;
        const params: SearchQuery = {
            apiKey,
            s,
            t,
            y,
            plot,
            apiUrl,
        };
        const response = await Axios.get(baseUrl, {
            ...baseConfig,
            method: 'GET',
            params,
        });
        return response.data;
    }
}

export default OMDBService;
