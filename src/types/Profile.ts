export interface UsersProfile {
    full_name: string;
    profile_picture_url: string;
    followers: number;
    following: number;
    liked_song_count: number;
    user_id: string;
    email?: string
}

export interface PublicProfile {
    full_name: string;
    profile_picture_url: string;
    followers: number;
    following: number;
    liked_song_count: number;
    user_id: string;
}

export interface ConnecitonProfile {
    user_id: number;
    full_name: string;
    profile_picture_url: string;
    username: string
}