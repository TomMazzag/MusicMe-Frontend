import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { SongSearchTile } from '../../Util/SongSearchTile';
import { getPlatformToken, getSpotifyToken } from '@MusicMe/utils';
import { setHighlightedSong } from '../../../services/account';

interface Props {
    modalId: string;
}

export const SongSearchModalSmall = ({ modalId }: Props) => {
    const [searchInput, setSearchInput] = useState('');
    const access_token = getSpotifyToken();
    const platform_token = getPlatformToken();
    const encodedURI = `https://api.spotify.com/v1/search?q=${searchInput}&type=track`;
    const queryClient = useQueryClient()

    const { data: tracks, isLoading } = useQuery({
        queryKey: ['song', searchInput],
        queryFn: async (): Promise<SpotifyApi.TrackObjectFull[]> =>
            fetch(encodedURI, {
                method: 'GET',
                headers: { Authorization: `Bearer ${access_token}` },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.tracks.items);
                    return data.tracks.items;
                }),
        enabled: searchInput.length > 2,
    });

    const setNewHighlightedSong = async (trackId: string) => {
        await setHighlightedSong(platform_token, trackId)
        const modal = document.getElementById('song-search-modal') as HTMLDialogElement | null;
        if (!modal) {
            return console.log('Modal missing from page');
        }
        modal.close();
        queryClient.invalidateQueries({ queryKey: ['analytics'], refetchType: 'active' });
    };

    return (
        <dialog className="modal" id={modalId}>
            <div className="modal-box">
                <div>
                    <label className="input w-full flex gap-2 items-center mb-4">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            type="search"
                            className="grow py-10"
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </label>
                    <div className="max-h-[50vh] lg:max-h-[250px] overflow-scroll mb-4">
                        {isLoading ? (
                            <ScaleLoader color={'#22c55e'} />
                        ) : (
                            <div className="flex flex-col gap-5">
                                {tracks && tracks.length > 0 ? (
                                    tracks.map((track) => {
                                        return (
                                            <>
                                                <SongSearchTile
                                                    data={{
                                                        imageUrl: track.album.images[0].url,
                                                        value1: track.name,
                                                        value2: track.artists[0].name,
                                                        clickableUrl: `/songs/${track.id}`,
                                                        trackId: track.id,
                                                    }}
                                                    onClickHandler={setNewHighlightedSong}
                                                    key={track.id}
                                                />
                                            </>
                                        );
                                    })
                                ) : (
                                    <p className="opacity-50">Search to begin</p>
                                )}
                            </div>
                        )}
                    </div>
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};
