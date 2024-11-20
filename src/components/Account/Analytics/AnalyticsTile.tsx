import { useQuery } from '@tanstack/react-query';
import { getPlatformToken } from '../../../utils/tokenGen';
import { getAccountAnalytics } from '../../../services/account';
import { ScaleLoader } from 'react-spinners';
import { Chart } from './Chart';
//import { getCurrentUserId } from '../../../utils/user';

interface StatsProps {
    data: {
        playlistCount: number;
        likedSongs: number | undefined
    };
}

export const AnalyticsTile = ({ data }: StatsProps) => {
    const platform_token = getPlatformToken();
    //const userId = getCurrentUserId(platform_token);
    const access_token = localStorage.getItem('access_token');

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
        <div className="text-center mb-10">
            <p className="mb-4">Stats section</p>

            {data && analytics && (
                <>
                    <div className="mb-10">
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
