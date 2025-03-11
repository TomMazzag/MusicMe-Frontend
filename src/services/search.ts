import { BACKEND_URL, createAuthenticatedGetRequestOptions } from "./util";

export const searchUser = async (username: string) => {
    const requestOptions = {
        method: 'GET',
    };

    const response = await fetch(`${BACKEND_URL}/search/user?name=${username}`, requestOptions);

    let data = await response.json();
    return data;
};

export const getSong = async (songId: string, access_token: string, platform_token: string) => {
    const requestOptions = createAuthenticatedGetRequestOptions(platform_token);

    try {
        const response = await fetch(
            `${BACKEND_URL}/search/song?songId=${songId}&access_token=${access_token}`,
            requestOptions,
        );
        if (response.status === 401) {
            throw Error('Expired Token');
        }
        let data = await response.json();

        return data;
    } catch (e) {
        throw e;
    }
};
