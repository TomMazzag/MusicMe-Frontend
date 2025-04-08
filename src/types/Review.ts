export interface Review {
    id: number
    username: string;
    profile_picture_url: string;
    full_name: string;
    user_id: number;
    comment: string;
    rating: number;
    userHasLiked: boolean;
    likes: number;
}

export interface TrendingReview extends SpotifyApi.TrackObjectFull {
    username: string;
    profile_picture_url: string;
    comment: string;
}
