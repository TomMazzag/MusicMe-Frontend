import { useQuery } from '@tanstack/react-query';
import { getPlatformToken, getSpotifyToken } from '@MusicMe/utils';
import { getAccountAnalytics, getPublicAccountAnalytics } from '../../../services/account';
import { ScaleLoader } from 'react-spinners';
import { Chart } from './Chart';
import { HighlightedSong } from './HighlightedSong';
import { GenreSelector } from '../GenreSelector';
import { Profile } from '@MusicMe/types';

interface StatsProps {
    data: {
        playlistCount: number | undefined;
        likedSongs: number | undefined;
    };
    profile?: Profile.Public;
}

export const AnalyticsTile = ({ data, profile }: StatsProps) => {
    const platform_token = getPlatformToken();
    const access_token = getSpotifyToken();

    const { data: analytics, isLoading } = useQuery({
        queryKey: ['analytics'],
        queryFn: async () =>
            profile
                ? getPublicAccountAnalytics(platform_token, access_token, profile.user_id)
                : getAccountAnalytics(platform_token, access_token),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });

    if (profile) {
        return (
            <div className="flex flex-col gap-14 mb-10">
                {isLoading && <div className="skeleton h-28 w-2/3"></div>}
                {analytics && (
                    <div>
                        <p className="text-center mb-4 text-2xl">Highligted Song:</p>
                        <HighlightedSong track={getTopTrack(analytics)} />
                    </div>
                )}
                <div className="grid grid-cols-2 gap-8">
                    <StatsTile heading="Total Playlists" statValue={String(data.playlistCount)} />
                    <StatsTile heading="Songs liked" statValue={String(data.likedSongs)} />
                </div>
            </div>
        );
    }

    if (isLoading) {
        return <ScaleLoader color={'#22c55e'} />;
    }

    return (
        <div className="flex flex-col text-center mb-10 items-center gap-14">
            {data && analytics && (
                <>
                    <div>
                        <p className="text-center mb-4 text-2xl">Highligted Song:</p>
                        <HighlightedSong track={getTopTrack(analytics)} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-14 px-10">
                        <div className="grid grid-cols-2 gap-8">
                            <StatsTile heading="Total Playlists" statValue={String(data.playlistCount)} />
                            <StatsTile heading="Songs liked" statValue={String(data.likedSongs)} />
                        </div>
                        <div aria-label="Genre badges container">
                            <GenreSelector selectedGenres={[]} />
                        </div>
                        <Chart title="Top Artists" rowData={analytics.topArtists.items} />
                        <Chart title="Top Songs" rowData={analytics.topTracks.items} />
                    </div>
                </>
            )}
        </div>
    );
};

const getTopTrack = (analytics: Profile.Analytics): SpotifyApi.TrackObjectFull | undefined => {
    let returnedTrack = undefined;
    if (analytics.highlightedSong) {
        returnedTrack = analytics.highlightedSong;
    }
    if (!analytics.highlightedSong && analytics.topTracks) {
        returnedTrack = analytics.topTracks.items[0];
    }
    return returnedTrack;
};

interface StatsTileProps {
    heading: string;
    statValue: string;
}
export const StatsTile = ({ heading, statValue }: StatsTileProps) => {
    return (
        <div className="flex items-center flex-col bg-base-300 rounded-2xl md:rounded-md p-4 px-2 gap-2">
            <h1 className="text-xl">{heading}</h1>
            <p className="flex-1 text-4xl font-semibold text-accent">{statValue}</p>
        </div>
    );
};
