import { refreshToken } from '../services/token';

export const getNewToken = async () => {
    interface tokenResponse {
        access_token?: string;
        refresh_token?: string;
    }

    const response = (await refreshToken(localStorage.getItem('refresh_token') as string)) as tokenResponse;
    localStorage.setItem('access_token', response.access_token!);
    localStorage.setItem('refresh_token', response.refresh_token!);

    return response.access_token;
};

export const getPlatformToken = () => {
    const platform_token = localStorage.getItem('platform_token');

    if (!platform_token) {
        window.location.href = '/';
        throw new Error('platform_token is required but was not found.');
    }

    return platform_token;
};
