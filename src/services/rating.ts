const backend_url = import.meta.env.VITE_BACKEND_URL;

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

    const response = await fetch(`${backend_url}/rate/song`, requestOptions);

    if (response.status === 200) {
        let data = await response.json();
        return data;
    } else {
        let data = await response.json();
        return data;
    }
};