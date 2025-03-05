export const getNewToken = async () => {
    interface tokenResponse {
        access_token?: string;
        refresh_token?: string;
    }

    const response = (await refreshToken(localStorage.getItem('refresh_token') as string)) as tokenResponse;

    if (response.access_token === undefined || response.refresh_token === undefined) {
        window.location.href = '/';
        throw new Error('Spotify token expired');
    }

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

const refreshToken = async (refresh_token: string) => {
    const url = 'https://accounts.spotify.com/api/token';
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
            client_id: import.meta.env.VITE_CLIENT_ID,
        }),
    };

    try {
        const body = await fetch(url, payload);
        const response = await body.json();
        console.log(response);
        return {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
        };
    } catch (err) {
        console.error(err);
        return err
    }
};
