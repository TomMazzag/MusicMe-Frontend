const backend_url = import.meta.env.VITE_BACKEND_URL

export const searchUser = async (username: string) => {
    const requestOptions = {
        method: "GET"
    };

    const response = await fetch(`${backend_url}/search/user?name=${username}`, requestOptions);

    let data = await response.json();
    return data
};
