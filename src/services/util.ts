export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const createAuthenticatedGetRequestOptions = (platform_token: string) => ({
    method: 'GET',
    headers: {
        Authorization: `Bearer ${platform_token}`,
        'Content-Type': 'application/json',
    },
})