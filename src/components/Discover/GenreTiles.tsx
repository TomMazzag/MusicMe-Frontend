import { Genre } from '../../types/Genre';
import { ProfileBadges } from '../GenreBadges/GenreBadges';

interface GenreTileProps {
    genre: Genre;
}

export const GenreTile = ({ genre }: GenreTileProps) => {
    return (
        <a href={`/genre/${genre.genre_key}`}>
            <div className="bg-base-300 cursor-pointer px-4 py-6 w-52 h-48 rounded-lg flex-none text-center">
                <div className="flex justify-center">{ProfileBadges[genre.genre_key].component}</div>
                <p className="mt-4 opacity-70 text-sm">{genre.short_description}</p>
            </div>
        </a>
    );
};
