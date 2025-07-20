import { useState } from 'react';
import { Review } from '../../types/Review';
import { ReviewBoxUserOptions } from './ReviewBoxUserOptions';
import { QueryClient } from '@tanstack/react-query';
import { toggleLikeReview } from '../../services/rewiew';
import { getPlatformToken } from '@MusicMe/utils';
import { Profile } from 'src/types/Profile';
import { ProfimeImageAndName } from 'src/components/Account/ProfileImageAndName';

interface ReviewProps {
    review: Review;
    currentUserId: Profile.User['user_id'];
    queryClient: QueryClient;
}

export const ReviewBox = ({ review, currentUserId, queryClient }: ReviewProps) => {
    const [likedStatus, setLikedStatus] = useState({
        liked: review.userHasLiked,
        likeCount: review.likes,
    });

    const toggleLike = async () => {
        setLikedStatus((prevStatus) => {
            const newLikes = prevStatus.liked ? prevStatus.likeCount - 1 : prevStatus.likeCount + 1;
            return {
                liked: !prevStatus.liked,
                likeCount: newLikes,
            };
        });

        try {
            await toggleLikeReview(getPlatformToken(), review.id);
        } catch (error) {
            console.error('Error toggling like:', error);
            setLikedStatus((prevStatus) => ({
                liked: !prevStatus.liked,
                likeCount: prevStatus.liked ? prevStatus.likeCount + 1 : prevStatus.likeCount - 1,
            }));
        }
    };

    return (
        <div className="text-left px-4 py-4 bg-base-200 rounded-[20px] relative">
            <ProfimeImageAndName
                profileImageUrl={review.profile_picture_url}
                username={review.username}
                fullName={review.full_name}
            ></ProfimeImageAndName>
            <div className="pl-2 mr-[10%]">
                <p>{review.comment}</p>
                <p>{review.rating} / 5</p>
            </div>
            <button className="absolute top-[40%] right-[10px] lg:right-[20px]" onClick={toggleLike}>
                <i
                    className={likedStatus.liked ? 'fa-solid fa-heart text-[20px]' : 'fa-regular fa-heart text-[20px]'}
                ></i>
                <span className="ml-[4px]">{likedStatus.likeCount}</span>
            </button>
            {review.user_id === currentUserId && (
                <>
                    <ReviewBoxUserOptions reviewId={review.id} queryClient={queryClient} />
                </>
            )}
        </div>
    );
};
