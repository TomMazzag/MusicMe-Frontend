import { BACKEND_URL } from '../services/util';

interface TokenResponse {
    spotify_token?: string;
    refresh_token?: string;
}
export const getNewToken = async () => {
    const refresh_token = localStorage.getItem('refresh_token')

    if (!refresh_token) {
        console.log('Refresh token missing returning to homepage');
        return (window.location.href = '/');
    }

    const response = await getNewTokenRequest(refresh_token);

    if (response.spotify_token === undefined || response.refresh_token === undefined) {
        window.location.href = '/';
        throw new Error('Error getting new token');
    }

    localStorage.setItem('access_token', response.spotify_token);
    localStorage.setItem('refresh_token', response.refresh_token);

    return response.spotify_token;
};

const getNewTokenRequest = async (refresh_token: string): Promise<TokenResponse> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token }),
    };

    const response = await fetch(`${BACKEND_URL}/auth/refresh/spotify_token`, requestOptions);

    let data = await response.json();
    return data;
};

const PLATFORM_TOKEN_STORAGE_KEY = 'platform_token';
export const getPlatformToken = () => {
    const platform_token = localStorage.getItem(PLATFORM_TOKEN_STORAGE_KEY);

    if (!platform_token) {
        window.location.href = '/';
        throw new Error('platform_token is required but was not found.');
    }

    return platform_token;
};

export const SPOTIFY_TOKEN_STORAGE_KEY = 'access_token';
export const getSpotifyToken = () => {
    const spotify_token = localStorage.getItem(SPOTIFY_TOKEN_STORAGE_KEY);

    if (!spotify_token) {
        window.location.href = '/';
        throw new Error('Spotify token is required but was not found.');
    }

    return spotify_token;
};
