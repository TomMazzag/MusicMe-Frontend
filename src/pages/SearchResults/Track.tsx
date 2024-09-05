import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { useEffect, useState } from 'react';
import { getNewToken } from '../../utils/tokenGen';
import { getSong } from '../../services/search';
import { toggleLikeSong } from '../../services/account';
import { Song } from '../../types/Song';

//Note this is temp and for visual purposes
import Snackbar from '@mui/material/Snackbar';
import { createReview } from '../../services/rating';

export const TrackPage = () => {
    const { songId } = useParams();
    const [access_token, setAccess_token] = useState(localStorage.getItem('access_token'));
    const [song, setSong] = useState<Song>();
    const [comment, setComment] = useState('');
    const platform_token = localStorage.getItem('platform_token');
    const [open, setOpen] = useState(false);

    if (!songId) {
        throw new Error('songId is required but was not found.');
    }

    if (!platform_token) {
        throw new Error('platform_token is required but was not found.');
    }

    const getSongAsync = async () => {
        try {
            const res = await getSong(songId, access_token!, platform_token);
            res.spotifyData = { ...res.spotifyData, likes: res.likes, userHasLiked: res.user_has_liked };
            setSong(res.spotifyData);
        } catch (error) {
            if ((error = 'Expired Token')) {
                console.log('Generating new token');
                const newToken = await getNewToken();
                setAccess_token(newToken!);
                return;
            }
        }
    };

    useEffect(() => {
        const fetchDataAndLike = async () => {
            try {
                await getSongAsync();
            } catch (error) {
                console.error('Error in fetchDataAndLike:', error);
            }
        };

        fetchDataAndLike();
        return;
    }, []);

    const handleKeyDown = async (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            setOpen(true);
            event.preventDefault();
            createReview(platform_token, comment, songId).then((data) => console.log(data))
            console.log(comment);
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

    // Needs removing once review functionality is added
    const closePopup = () => {
        setOpen(false);
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center flex-col justify-between h-[90vh] w-full p-4 text-center md:p-0">
                {song ? (
                    <>
                        <div className="flex gap-5 flex-row items-center w-full justify-evenly md:mt-10 md:w-[50%]">
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
                                </div>
                            </div>
                        </div>
                        <div
                            className={`flex grow ${1 === 1 && 'items-center w-[75%] md:w-full' /* Add logic for if theres no comments */}`}
                        >
                            <p className="grow">No comments yet! Be the first to leave a comment about this song</p>
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
                        <Snackbar
                            open={open}
                            autoHideDuration={3000}
                            onClose={closePopup}
                            message={'Comment submitted - feature not yet operational'}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        />
                    </>
                ) : (
                    <div className="skeleton h-[200px] w-[40%] mt-10"></div>
                )}
            </div>
        </>
    );
};
