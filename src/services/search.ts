const backend_url = import.meta.env.VITE_BACKEND_URL

export const searchUser = async (username: string) => {
    const requestOptions = {
        method: "GET"
    };

    const response = await fetch(`${backend_url}/search/user?name=${username}`, requestOptions);

    let data = await response.json();
    return data
};

export const getSong = async (songId: string, access_token: string) => {
    const requestOptions = {
        method: "GET"
    };

    try {
        const response = await fetch(`${backend_url}/search/song?songId=${songId}&access_token=${access_token}`, requestOptions);
        if(response.status === 401) {
            throw Error("Expired Token")
        }
        let data = await response.json();

        return data
    } catch(e) {
        throw e
    }
}
