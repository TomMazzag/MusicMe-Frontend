export interface Song extends SpotifyApi.TrackObjectFull {
    name: string;
    likes: number;
    userHasLiked: boolean;
    views: number;
    spotifyData?: Record<string, any>; // Optional additional data from Spotify
}
