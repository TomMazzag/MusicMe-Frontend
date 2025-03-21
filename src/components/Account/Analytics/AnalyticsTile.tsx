import { useQuery } from '@tanstack/react-query';
import { getPlatformToken, getSpotifyToken } from '../../../utils/tokenGen';
import { getAccountAnalytics } from '../../../services/account';
import { ScaleLoader } from 'react-spinners';
import { Chart } from './Chart';
import { HighlightedSong } from './HighlightedSong';
import { GenreSelector } from '../GenreSelector';

interface StatsProps {
    data: {
        playlistCount: number;
        likedSongs: number | undefined;
    };
    profileId?: string;
}

export const AnalyticsTile = ({ data, profileId }: StatsProps) => {
    const platform_token = getPlatformToken();
    const access_token = getSpotifyToken();

    if (profileId) {
        return (
            <div>
                <p>Total Playlists: {data.playlistCount}</p>
                <p className="text-center">Songs liked: {data.likedSongs}</p>
            </div>
        );
    }

    const {
        data: analytics,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ['analytics'],
        queryFn: async () => getAccountAnalytics(platform_token, access_token),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });

    if (isSuccess) {
        console.log('Analytics: ', analytics);
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
                        <HighlightedSong track={analytics.topTracks.items[0]} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-14 px-10">
                        <div className="grid grid-cols-2 gap-8">
                            <StatsTile heading="Total Playlists" statValue={String(data.playlistCount)} />
                            <StatsTile heading="Songs liked" statValue={String(data.likedSongs)} />
                        </div>
                        <div aria-label="Genre badges container" className="md:w-[480px]">
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

interface StatsTileProps {
    heading: string;
    statValue: string;
}
export const StatsTile = ({ heading, statValue }: StatsTileProps) => {
    return (
        <div className="flex items-center flex-col bg-base-300 rounded-2xl md:rounded-md p-4 px-2 gap-2">
            <h1 className='text-xl'>{heading}</h1>
            <p className='flex-1 text-4xl font-semibold text-accent'>{statValue}</p>
        </div>
    );
};
