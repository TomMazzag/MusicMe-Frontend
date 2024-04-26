const backend_url = import.meta.env.VITE_BACKEND_URL

export const followOrUnfollowUser = async (token: string, follow_id: string) => {
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