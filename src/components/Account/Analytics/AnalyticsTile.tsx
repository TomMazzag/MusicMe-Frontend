import { useQuery } from '@tanstack/react-query';
import { getPlatformToken } from '../../../utils/tokenGen';
import { getAccountAnalytics } from '../../../services/account';
import { ScaleLoader } from 'react-spinners';
import { Chart } from './Chart';
import { HighlightedSong } from './HighlightedSong';

interface StatsProps {
    data: {
        playlistCount: number;
        likedSongs: number | undefined
    };
    profileId?: string
}

export const AnalyticsTile = ({ data, profileId }: StatsProps) => {
    const platform_token = getPlatformToken();
    const access_token = localStorage.getItem('access_token');

    if (profileId) {
        return (
            <div>
                <p>Total Playlists: {data.playlistCount}</p>
                <p className="text-center">Songs liked: {data.likedSongs}</p>
            </div>
        );
    }

    const { data: analytics, isLoading, isSuccess } = useQuery({
        queryKey: ['analytics'],
        queryFn: async () => getAccountAnalytics(platform_token, access_token!),
    });

    if (isSuccess) {
        console.log("Analytics: ", analytics)
    }

    if (isLoading) {
        return <ScaleLoader color={'#22c55e'} />;
    }

    return (
        <div className="flex flex-col text-center mb-10 items-center gap-10">
            {data && analytics && (
                <>
                    <div>
                        <p className="text-center mb-4 text-2xl">Highligted Song:</p>
                        <HighlightedSong track={analytics.topTracks.items[0]} />
                    </div>

                    <div>
                        <p>Total Playlists: {data.playlistCount}</p>
                        <p className="text-center">Songs liked: {data.likedSongs}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-14 px-10">
                        <Chart title="Top Artists" rowData={analytics.topArtists.items} />
                        <Chart title="Top Songs" rowData={analytics.topTracks.items} />
                    </div>
                </>
            )}
        </div>
    );
};
