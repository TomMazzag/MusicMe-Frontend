const backend_url = "http://localhost:3000"

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

    const response = await fetch(`${backend_url}/auth/login`, requestOptions);

    if (response.status === 200) {
        let data = await response.json();
        return data.token
    } else {
        let data = await response.json();
        return data
    }
}