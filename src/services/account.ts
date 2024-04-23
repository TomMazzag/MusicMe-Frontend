const backend_url = import.meta.env.VITE_BACKEND_URL

export const getAccountDetailsUsersAccount = async () => {
    const requestOptions = {
        method: "GET"
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
