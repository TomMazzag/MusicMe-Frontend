export interface Review {
    user: {
        username: string;
        profile_pic_url: string;
        full_name: string;
        user_id: number
    };
    comment: string;
    rating: number;
    userHasLiked: boolean
    likes: number
}
