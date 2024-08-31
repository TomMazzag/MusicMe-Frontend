const backend_url = import.meta.env.VITE_BACKEND_URL

export const followOrUnfollowUser = async (token: string, follow_id: number) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({follow_id: follow_id})
    };  

    const response = await fetch(`${backend_url}/user/follow`, requestOptions);

    let data = await response.json();
    return data
}

export const getFollowers = async (token: string, users_id: string) => {
    const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await fetch(`${backend_url}/user/${users_id}/followers`, requestOptions);

    let data = await response.json();
    return data
}

export const getFollowing = async () => {}