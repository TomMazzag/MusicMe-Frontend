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

export interface UsersProfile extends BaseProfile {
    email?: string;
}

export interface PublicProfile extends BaseProfile {
}

export interface ConnecitonProfile {
    user_id: number;
    full_name: string;
    profile_picture_url: string;
    username: string;
    is_following: boolean;
    currentUserId: number;
}

export interface ProfileAnalytics {
    message: string;
    topArtists: {
        items: SpotifyApi.ArtistObjectFull[];
    };
    topTracks: {
        items: SpotifyApi.TrackObjectFull[];
    };
}
