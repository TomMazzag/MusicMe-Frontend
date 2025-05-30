import { BACKEND_URL, createAuthenticatedGetRequestOptions } from "./util";

export const getReviews = async (platform_token: string, songId: string) => {

    const requestOptions = createAuthenticatedGetRequestOptions(platform_token);

    const response = await fetch(`${BACKEND_URL}/rate/song/${songId}`, requestOptions);

    if (response.status === 200) {
        let data = await response.json();
        return data;
    } else {
        let data = await response.json();
        return data;
    }
};

export const createReview = async (platform_token: string, comment: string, songId: string) => {
    const payload = {
        comment,
        songId
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${platform_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/rate/song`, requestOptions);

    if (response.status === 200) {
        let data = await response.json();
        return data;
    } else {
        let data = await response.json();
        return data;
    }
};

export const deleteReview = async (platform_token: string, reviewId: number) => {

    const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${platform_token}`,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`${BACKEND_URL}/rate/delete-review/${reviewId}`, requestOptions);

    if (response.status === 200) {
        let data = await response.json();
        return data;
    } else {
        let data = await response.json();
        return data;
    }
};

export const toggleLikeReview = async (token: string, reviewId: number) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewId }),
    };

    const response = await fetch(`${BACKEND_URL}/like/review`, requestOptions);

    let data = await response.json();
    return data;
};

export const getTopReviews = async (platform_token: string, spotify_token: string) => {
    const requestOptions = createAuthenticatedGetRequestOptions(platform_token);

    const response = await fetch(`${BACKEND_URL}/rate/top?spotify_token=${spotify_token}`, requestOptions);

    let data = await response.json();
    return data;
};