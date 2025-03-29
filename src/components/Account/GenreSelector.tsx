import { PlatformGenres } from '../../types/Genre';
import { ProfileBadges } from '../GenreBadges/GenreBadges';

interface GenreSelectorProps {
    selectedGenres: [];
}

export const GenreSelector = ({ selectedGenres }: GenreSelectorProps) => {
    console.log(selectedGenres)
    const genres = Object.keys(ProfileBadges) as PlatformGenres[];
    return (
        <div className="collapse bg-base-100 border-base-300 border">
            <input type="checkbox" />
            <div className="collapse-title font-semibold text-center px-0 h-[10px] min-h-4">
                Add your favourite genre badges
            </div>
            <div className="collapse-content text-sm">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center md:max-h-[4.5rem] overflow-scroll">
                    {genres.map((genreName) => {
                        return <div key={genreName}>{ProfileBadges[genreName].component}</div>;
                    })}
                </div>
            </div>
        </div>
    );
};
