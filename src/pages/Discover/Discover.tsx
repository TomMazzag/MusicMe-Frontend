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
                <DiscoverSection sectionTitle="Genres">
                    {genresLoading ? (
                        <>
                            <ScaleLoader color={'#22c55e'} />
                        </>
                    ) : !genres ? (
                        <>Error collecting genres</>
                    ) : (
                        <div className="flex gap-8 overflow-x-scroll overflow-y-hidden">
                            {genres.map((genre) => (
                                <GenreTile genre={genre}></GenreTile>
                            ))}
                        </div>
                    )}
                </DiscoverSection>
                <DiscoverSection sectionTitle="Todays Stats">
                    <div className="bg-base-300 w-[500px] p-4 rounded-lg text-center">
                        <h1 className="text text-2xl mb-6">Top viewed songs today</h1>
                        {isLoading ? (
                            <>
                                <ScaleLoader color={'#22c55e'} />
                            </>
                        ) : (
                            tracks && (
                                <ul className="flex flex-col gap-4">
                                    {tracks.map((track) => (
                                        <li className="flex items-center content-start gap-4" key={track.id}>
                                            <span>{track.viewCount}</span>
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
                                        </li>
                                    ))}
                                </ul>
                            )
                        )}
                    </div>
                </DiscoverSection>
            </div>
        </>
    );
};
