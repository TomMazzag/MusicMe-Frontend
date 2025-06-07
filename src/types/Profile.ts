export namespace Profile {
    interface BaseProfile {
        full_name: string;
        profile_picture_url: string;
        followers: number;
        following: number;
        liked_song_count: number;
        user_id: string;
        review_count: number;
        username: string;
    }

    export interface User extends BaseProfile {
        email?: string;
    }

    export interface Public extends BaseProfile {}

    export interface Conneciton {
        user_id: string;
        full_name: string;
        profile_picture_url: string;
        username: string;
        is_following: boolean;
        currentUserId: string;
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

export type ActiveTab = 'Playlists' | 'Liked' | 'Analytics';
