import { shortenString } from '../../../utils/stringShorten';
import { ClickableDiv } from '../../Util/ClickableDiv';
import { SongSearchModalSmall } from './SongSearchMini';

interface Props {
    track: SpotifyApi.TrackObjectFull;
}

const selectNewHighlightedSong = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const modal = document.getElementById('song-search-modal') as HTMLDialogElement | null; 
    if (!modal) {
        return console.log('Modal missing from page')
    }
    modal.showModal()
};

export const HighlightedSong = ({ track }: Props) => {
    return (
        <div className="flex h-16">
            <ClickableDiv url={`/songs/${track.id}`}>
                <div className="flex items-center gap-3 bg-base-300 w-[280px] rounded-l-lg overflow-hidden">
                    <img src={track.album.images[0].url} alt="" className="h-16" />
                    <div className="text-start flex-1">
                        <p>{shortenString(track.name, 25)}</p>
                        <p className="opacity-60">{track.artists[0].name}</p>
                    </div>
                </div>
            </ClickableDiv>
            <button
                className="w-10 bg-gray-700 h-full flex items-center rounded-r-lg"
                onClick={(e) => selectNewHighlightedSong(e)}
            >
                <i className="fa-regular fa-pen-to-square fa-small flex-1"></i>
            </button>
            <SongSearchModalSmall open={true} modalId="song-search-modal" />
        </div>
    );
};
