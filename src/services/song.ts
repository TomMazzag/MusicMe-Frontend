const backend_url = import.meta.env.VITE_BACKEND_URL;

export const getTrackView = async (token: string, song_id: string) => {
    const requestOptions = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    };

    const response = await fetch(`${backend_url}/song/${song_id}/views`, requestOptions);

    let data = await response.json();
    return data;
};

export const addTrackView = async (token: string, song_id: string) => {
    const requestOptions = {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    };

    const response = await fetch(`${backend_url}/song/${song_id}/view`, requestOptions);

    let data = await response.json();
    return data;
};
