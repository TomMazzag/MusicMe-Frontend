import { ChartTile } from './ChartTile';

interface ChartProps {
    title: string;
    rowData: SpotifyApi.TrackObjectFull[] | SpotifyApi.ArtistObjectFull[];
}

const isTrack = (
    item: SpotifyApi.TrackObjectFull | SpotifyApi.ArtistObjectFull,
): item is SpotifyApi.TrackObjectFull => {
    return 'album' in item; 
};

export const Chart = ({ title, rowData }: ChartProps) => {
    return (
        <div className="p-6 rounded-2xl md:rounded-md bg-base-300 flex flex-col gap-4">
            <h1 className='text text-2xl'>{title}</h1>
            {rowData.map((row, index) => (
                <ChartTile
                    key={row.name}
                    data={
                        isTrack(row)
                            ? { index, imageUrl: row.album.images[0].url, value1: row.name, value2: row.artists[0].name, clickableUrl: `/songs/${row.id}`} // Track
                            : { index, imageUrl: row.images[0].url, value1: row.name, clickableUrl: row.external_urls.spotify } // Artist
                    }
                />
            ))}
        </div>
    );
};


