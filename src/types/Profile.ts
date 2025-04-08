export namespace Profile {
    interface BaseProfile {
        full_name: string;
        profile_picture_url: string;
        followers: number;
        following: number;
        liked_song_count: number;
        user_id: number;
        review_count: number;
        username: string;
    }

    export interface User extends BaseProfile {
        email?: string;
    }

    export interface Public extends BaseProfile {}

    export interface Conneciton {
        user_id: number;
        full_name: string;
        profile_picture_url: string;
        username: string;
        is_following: boolean;
        currentUserId: number;
    }

    export interface Analytics {
        message: string;
        highlightedSong: SpotifyApi.TrackObjectFull;
        topArtists: {
            items: SpotifyApi.ArtistObjectFull[];
        };
        topTracks: {
            items: SpotifyApi.TrackObjectFull[];
        };
    }
}
