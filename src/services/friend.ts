import { Profile } from "src/types/Profile";
import { BACKEND_URL, createAuthenticatedGetRequestOptions } from "./util";

export const followOrUnfollowUser = async (platform_token: string, follow_id: Profile.Public['user_id']) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${platform_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ follow_id: follow_id }),
    };

    const response = await fetch(`${BACKEND_URL}/user/follow`, requestOptions);

    let data = await response.json();
    return data;
};

export const getFollowers = async (platform_token: string, users_id: string) => {
    const requestOptions = createAuthenticatedGetRequestOptions(platform_token)

    const response = await fetch(`${BACKEND_URL}/user/${users_id}/followers`, requestOptions);

    let data = await response.json();
    return data;
};

export const getFollowing = async (platform_token: string, users_id: string) => {
    const requestOptions = {
        method: 'GET',
        headers: { Authorization: `Bearer ${platform_token}` },
    };

    const response = await fetch(`${BACKEND_URL}/user/${users_id}/following`, requestOptions);

    let data = await response.json();
    return data;
};
