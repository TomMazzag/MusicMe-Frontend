export interface UsersProfile {
    full_name: string;
    profile_picture_url: string;
    followers: number;
    following: number;
    liked_song_count: number;
    user_id: number;
    email?: string
}

export interface PublicProfile {
    full_name: string;
    profile_picture_url: string;
    followers: number;
    following: number;
    liked_song_count: number;
    user_id: number;
}

export interface ConnecitonProfile {
    user_id: number;
    full_name: string;
    profile_picture_url: string;
    username: string
    is_following: boolean,
    currentUserId: number
}