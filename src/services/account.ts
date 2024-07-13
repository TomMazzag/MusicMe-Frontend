const backend_url = import.meta.env.VITE_BACKEND_URL

export const getAccountDetailsUsersAccount = async (token: string) => {
    const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await fetch(`${backend_url}/user/account`, requestOptions);

    let data = await response.json();
    return data
};

export const getAccountDetailsPublicAccount = async (token: string, user_id: string) => {
    const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await fetch(`${backend_url}/user/account/${user_id}`, requestOptions);

    let data = await response.json();
    return data
};

export const getUsersLikedSongs = async (platform_token: string, access_token: string) => {
    const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${platform_token}` }
    };

    const response = await fetch(`${backend_url}/user/songs_liked?access_token=${access_token}`, requestOptions);

    let data = await response.json();
    return data
}

export const toggleLikeSong = async (token: string, songId: string) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({songId})
    };  

    const response = await fetch(`${backend_url}/like/song`, requestOptions);

    let data = await response.json();
    return data
}