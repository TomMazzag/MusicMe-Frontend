import { Profile } from '../types/Profile';
import { BACKEND_URL, createAuthenticatedGetRequestOptions } from './util';

export const getAccountDetailsUsersAccount = async (platform_token: string) => {
    const requestOptions = createAuthenticatedGetRequestOptions(platform_token);

    const response = await fetch(`${BACKEND_URL}/user/account`, requestOptions);

    let data = await response.json();
    return data;
};

export const getAccountDetailsPublicAccount = async (platform_token: string, user_id: string) => {
    const requestOptions = createAuthenticatedGetRequestOptions(platform_token);

    const response = await fetch(`${BACKEND_URL}/user/account/${user_id}`, requestOptions);

    let data = await response.json();
    return data;
};

export const getUsersLikedSongs = async (platform_token: string, access_token: string) => {
    const requestOptions = createAuthenticatedGetRequestOptions(platform_token);

    const response = await fetch(`${BACKEND_URL}/user/songs_liked?access_token=${access_token}`, requestOptions);

    let data = await response.json();
    return data;
};

export const toggleLikeSong = async (token: string, songId: string) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId }),
    };

    const response = await fetch(`${BACKEND_URL}/like/song`, requestOptions);

    let data = await response.json();
    return data;
};

export const getAccountAnalytics = async (platform_token: string, access_token: string) => {
    const requestOptions = createAuthenticatedGetRequestOptions(platform_token);

    const response = await fetch(`${BACKEND_URL}/user/analytics?access_token=${access_token}`, requestOptions);

    let data: Profile.Analytics = await response.json();
    return data;
};

export const setHighlightedSong = async (platform_token: string, songId: string) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${platform_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ songId }),
    };

    const response = await fetch(`${BACKEND_URL}/user/highlighted_song`, requestOptions);

    let data = await response.json();
    return data;
};
