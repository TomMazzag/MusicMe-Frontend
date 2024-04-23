const backend_url = import.meta.env.VITE_BACKEND_URL

export const login = async (access_token: string) => {
    const payload = {
        access_token
    }

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${backend_url}/user/login`, requestOptions);

    if (response.status === 200) {
        let data = await response.json();
        return data.token
    } else {
        let data = await response.json();
        return data
    }
}

export const createAccount = async (payload: any) => {

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${backend_url}/user/create`, requestOptions);

    if (response.status === 200) {
        let data = await response.json();
        return data.token
    } else {
        let data = await response.json();
        return data
    }
};
