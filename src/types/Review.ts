import { Profile } from "src/types/Profile";

export interface Review {
    id: number
    username: string;
    profile_picture_url: string;
    full_name: string;
    user_id: Profile.Public['user_id'];
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
