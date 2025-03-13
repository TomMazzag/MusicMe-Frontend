import { useState } from 'react';
import { getSpotifyToken, SPOTIFY_TOKEN_STORAGE_KEY } from '../utils/tokenGen';

export const useSpotifyToken = () => {
    const [spotifyToken, setSpotifyToken] = useState(getSpotifyToken());

    const updateSpotifyToken = (newToken: string) => {
        localStorage.setItem(SPOTIFY_TOKEN_STORAGE_KEY, newToken);
        setSpotifyToken(newToken);
    };

    return { spotifyToken, updateSpotifyToken };
};
