export const refreshToken = async (refresh_token: string) => {
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
    }
};
