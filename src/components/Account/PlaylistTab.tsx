import { shortenString } from '@MusicMe/utils';

export const PlaylistsTab = ({ playlists }: { playlists: SpotifyApi.PlaylistObjectFull[] | undefined }) => {
    return playlists ? (
        <div className="playlists mb-20 grid-cols-1 md:grid-cols-3">
            {playlists.map((playlist: any, index: number) => (
                <div key={index} className="playlist-tile text-center">
                    <a href={playlist.external_urls.spotify} target="_blank">
                        <img
                            src={playlist.images?.[0].url || undefined}
                            alt="Playlist artwork"
                            className="border-none rounded-xl"
                        />
                    </a>
                    <h4 className="mt-5">{shortenString(playlist.name, 35)}</h4>
                </div>
            ))}
        </div>
    ) : (
        <>No playlist for this user</>
    );
};
