import { Genre } from "../types/Genre";
import { BACKEND_URL, createAuthenticatedGetRequestOptions } from "./util";

export const getAllGenres = async (platform_token: string) => {
    const requestOptions = createAuthenticatedGetRequestOptions(platform_token);
    const response = await fetch(`${BACKEND_URL}/genre/get_all`, requestOptions);

    let data: {
        genres: Genre[];
    } = await response.json();
    return data;
};
