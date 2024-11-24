import { ClickableDiv } from '../../Util/ClickableDiv';

interface Props {
    track: SpotifyApi.TrackObjectFull;
}

export const HighlightedSong = ({ track }: Props) => {
    return (
        <ClickableDiv url={`/songs/${track.id}`}>
            <div className="flex items-center gap-3 bg-base-300 w-[300px] rounded-lg overflow-hidden">
                <img src={track.album.images[0].url} alt="" className="h-16" />
                <div className="text-start">
                    <p>{track.name}</p>
                    <p className="opacity-60">{track.artists[0].name}</p>
                </div>
            </div>
        </ClickableDiv>
    );
};
