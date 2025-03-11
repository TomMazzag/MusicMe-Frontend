import { BACKEND_URL, createAuthenticatedGetRequestOptions } from "./util";

export const getTrackView = async (platform_token: string, song_id: string) => {
    const requestOptions = createAuthenticatedGetRequestOptions(platform_token);

    const response = await fetch(`${BACKEND_URL}/song/${song_id}/views`, requestOptions);

    let data = await response.json();
    return data;
};

export const addTrackView = async (platform_token: string, song_id: string) => {
    const requestOptions = {
        method: 'POST',
        headers: { Authorization: `Bearer ${platform_token}`, 'Content-Type': 'application/json' }
    };

    const response = await fetch(`${BACKEND_URL}/song/${song_id}/view`, requestOptions);

    let data = await response.json();
    return data;
};

export const getTopViewedTracks = async (platform_token: string, spotify_token: string) => {
    const requestOptions = createAuthenticatedGetRequestOptions(platform_token);

    const response = await fetch(`${BACKEND_URL}/song/views/top?spotify_token=${spotify_token}`, requestOptions);

    let data = await response.json();
    return data;
};
