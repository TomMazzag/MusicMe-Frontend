import { useParams } from 'react-router-dom';
import { Navbar } from '@MusicMe/components/navbar';
import { useEffect, useRef, useState } from 'react';
import { getNewToken, getPlatformToken, getSpotifyToken, getCurrentUserId } from '@MusicMe/utils';
import { getSong } from '../../services/search';
import { toggleLikeSong } from '../../services/account';
import { Song } from '../../types/Song';
import { ReviewBox } from '../../components/Review/ReviewBox';
import { Review } from '../../types/Review';
import { createReview, getReviews } from '../../services/rewiew';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addTrackView } from '../../services/song';

export const TrackPage = () => {
    const { songId } = useParams();
    const [access_token, setAccess_token] = useState(getSpotifyToken());
    const [song, setSong] = useState<Song>();
    const [comment, setComment] = useState('');
    const platform_token = getPlatformToken();
    const currentUserId = getCurrentUserId(platform_token!);
    const queryClient = useQueryClient();
    const hasTrackedView = useRef(false);

    if (!songId) {
        throw new Error('songId is required but was not found.');
    }

    const getSongAsync = async () => {
        try {
            const res = await getSong(songId, access_token, platform_token);
            res.spotifyData = {
                ...res.spotifyData,
                likes: res.likes,
                userHasLiked: res.user_has_liked,
                views: res.views,
            };
            setSong(res.spotifyData);
        } catch (error) {
            if ((error = 'Expired Token')) {
                console.log('Generating new token');
                const newToken = await getNewToken();
                setAccess_token(newToken);
                return;
            }
        }
    };

    const { data: reviews } = useQuery({
        queryKey: ['reviews', songId],
        queryFn: async () => {
            const response = await getReviews(platform_token, songId);
            return response.reviews;
        },
    });

    useEffect(() => {
        const fetchDataAndLike = async () => {
            try {
                await getSongAsync();
            } catch (error) {
                console.error('Error in fetchDataAndLike:', error);
            }
        };

        fetchDataAndLike();
        if (!hasTrackedView.current) {
            addTrackView(platform_token, songId);
            hasTrackedView.current = true;
        }
        return;
    }, []);

    const handleKeyDown = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            await createReview(platform_token, comment, songId).then((data) => {
                console.log(data);
            });
            queryClient.invalidateQueries({ queryKey: ['reviews', songId] });
            setComment('');
        }
    };

    const triggerSongLikeToggle = async () => {
        if (songId !== undefined && song) {
            const liked = song.userHasLiked ? true : false;
            const newLikes = liked ? song.likes - 1 : song.likes + 1;

            setSong((prevSong: any) => ({
                ...prevSong,
                userHasLiked: !liked,
                likes: newLikes,
            }));
            await toggleLikeSong(platform_token, songId);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center flex-col justify-between h-[90vh] w-full p-4 text-center md:p-0">
                {song ? (
                    <>
                        <div className="flex gap-5 flex-row items-center w-full justify-evenly md:mt-8 mb-2 md:w-[50%]">
                            <img src={song.album.images[0].url} alt="" className="h-[150px] w-[150px]" />
                            <div className="flex flex-col justify-center text-center gap-2 md:gap-4">
                                <h1 className="text text-xl font-semibold md:text-4xl">{song.name}</h1>
                                <h2 className="text text-xl opacity-60 md:text-3xl">
                                    {song.artists.map((artist: any) => artist.name).join(', ')}
                                </h2>
                                <div className="flex justify-center w-full gap-3">
                                    <button onClick={triggerSongLikeToggle}>
                                        <i
                                            className={song.userHasLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
                                        ></i>
                                    </button>
                                    <p className="text text-xl">
                                        {song.likes} {song.likes === 1 ? 'Like' : 'Likes'}
                                    </p>
                                    <div className="flex gap-2 items-center ml-6" title="Views today">
                                        <i className="fa-solid fa-eye" aria-label="Eye icon"></i>
                                        <p className="text text-xl" aria-label="song views">
                                            {song.views}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`flex ${
                                reviews && reviews.length > 0
                                    ? 'w-[90%] md:w-[50%] justify-start my-4 flex-col grow overflow-y-auto gap-4'
                                    : 'grow items-center w-[75%] md:w-full' /* Add logic for if theres no comments */
                            }`}
                        >
                            {reviews.length > 0 ? (
                                reviews &&
                                reviews.map((review: Review) => (
                                    <ReviewBox
                                        review={review}
                                        currentUserId={currentUserId}
                                        queryClient={queryClient}
                                        key={review.id}
                                    />
                                ))
                            ) : (
                                <p className="grow">No comments yet! Be the first to leave a comment about this song</p>
                            )}
                        </div>
                        <div className="w-full flex justify-center md:mb-4">
                            <input
                                type="text"
                                placeholder="This song reminds me of..."
                                id="comment-input"
                                className="input input-bordered w-full rounded-3xl md:w-[65%]"
                                value={comment}
                                onChange={(e) => {
                                    setComment(e.target.value);
                                }}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </>
                ) : (
                    <div className="skeleton h-[200px] w-[40%] mt-10"></div>
                )}
            </div>
        </>
    );
};
