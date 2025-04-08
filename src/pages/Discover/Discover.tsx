import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { SongSearchTile } from '../../components/Util/SongSearchTile';
import { getTopViewedTracks } from '../../services/song';
import { getPlatformToken, getSpotifyToken } from '../../utils/tokenGen';
import { useQuery } from '@tanstack/react-query';
import { ScaleLoader } from 'react-spinners';
import { getAllGenres } from '../../services/genre';
import { GenreTile } from '../../components/Discover/GenreTiles';
import { DiscoverSection } from '../../components/Discover/DiscoverSections';
import { ProgressionArrowUp } from '../../components/Discover/TopStatProgressionArrows';
import { ChartNoAxesColumnIncreasing } from 'lucide-react';
import { getTopReviews } from '../../services/rewiew';
import { TrendingReview } from '../../types/Review';
import { shortenString } from '../../utils/stringShorten';

interface TrackWithViews extends SpotifyApi.TrackObjectFull {
    viewCount: number;
}

export const DiscoverPage = ({}) => {
    const platform_token = getPlatformToken();
    const spotify_token = getSpotifyToken();
    const navigate = useNavigate();

    const { data: tracks, isLoading } = useQuery({
        queryKey: ['song'],
        queryFn: async (): Promise<TrackWithViews[]> =>
            getTopViewedTracks(platform_token, spotify_token).then((data) => {
                return data.songsData;
            }),
    });

    const { data: reviews, isLoading: reviewsLoading } = useQuery({
        queryKey: ['review'],
        queryFn: async (): Promise<TrendingReview[]> =>
            getTopReviews(platform_token, spotify_token).then((data) => {
                console.log(data)
                return data;
            }),
    });

    const { data: genres, isLoading: genresLoading } = useQuery({
        queryKey: ['genre'],
        queryFn: () =>
            getAllGenres(platform_token).then((data) => {
                return data.genres;
            }),
        staleTime: 1000 * 60 * 60 * 24,
    });

    const goToSongPage = (trackId: string) => {
        navigate(`/songs/${trackId}`);
    };

    return (
        <>
            <Navbar />

            <div className="flex flex-col p-6 gap-10">
                <DiscoverSection sectionTitle="Todays Stats">
                    <div className="md:grid grid-cols-3 gap-8 flex flex-col">
                        <div className="bg-base-300 p-4 rounded-lg text-center">
                            <h1 className="text text-2xl mb-6">Top viewed songs today</h1>
                            {isLoading ? (
                                <>
                                    <ScaleLoader color={'#22c55e'} />
                                </>
                            ) : (
                                tracks && (
                                    <ul className="flex flex-col gap-4">
                                        {tracks.map((track) => (
                                            <li
                                                className="flex items-center gap-4 w-full justify-between"
                                                key={track.id}
                                            >
                                                <ProgressionArrowUp />
                                                <SongSearchTile
                                                    data={{
                                                        imageUrl: track.album.images[0].url,
                                                        value1: track.name,
                                                        value2: track.artists[0].name,
                                                        clickableUrl: track.href,
                                                        trackId: track.id,
                                                    }}
                                                    onClickHandler={() => goToSongPage(track.id)}
                                                />
                                                <div className="flex" title="Track views">
                                                    <ChartNoAxesColumnIncreasing />
                                                    <span className="w-[3ch] text-right" title="Track views">
                                                        {track.viewCount}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )
                            )}
                        </div>
                        <div className="bg-base-300 p-4 rounded-lg text-center">
                            <h1 className="text text-2xl mb-6">Top viewed artists today</h1>
                            <>
                                <p>No data today, check back tomorrow for new data</p>
                            </>
                        </div>
                        <div className="bg-base-300 p-4 rounded-lg text-center">
                            <h1 className="text text-2xl mb-6">Trending reviews</h1>
                            {reviewsLoading ? (
                                <>
                                    <ScaleLoader color={'#22c55e'} />
                                </>
                            ) : reviews && reviews.length > 0 ? (
                                <ul className="flex flex-col gap-4">
                                    {reviews.map((review) => (
                                        <li className="flex items-center gap-4 w-full" key={review.id}>
                                            <>
                                                <img src={review.album.images[0].url} alt="" className="h-14 rounded" />
                                                <div className="flex flex-col text-start">
                                                    <p>{shortenString(review.comment, 40)}</p>
                                                    <p className="opacity-60">@{review.username}</p>
                                                </div>
                                            </>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <>
                                    <p>No data today, check back tomorrow for new data</p>
                                </>
                            )}
                        </div>
                    </div>
                </DiscoverSection>
                <DiscoverSection sectionTitle="Genres">
                    {genresLoading ? (
                        <>
                            <ScaleLoader color={'#22c55e'} />
                        </>
                    ) : !genres ? (
                        <>Error collecting genres</>
                    ) : (
                        <div className="flex gap-8 overflow-x-scroll overflow-y-hidden pb-4">
                            {genres.map((genre) => (
                                <GenreTile genre={genre}></GenreTile>
                            ))}
                        </div>
                    )}
                </DiscoverSection>
                <DiscoverSection sectionTitle="New Releases">
                    <>This section is coming soon!</>
                </DiscoverSection>
            </div>
        </>
    );
};
