import { Genre } from "../../types/Genre";
import { Title } from "../Util/TextComponents";

interface GenreTileProps {
    genre: Genre;
}

export const GenreTile = ({ genre }: GenreTileProps) => {
    return (
        <div className="bg-base-300 cursor-pointer p-4 w-52 h-52 rounded-lg flex-none">
            <Title>{genre.genre_name}</Title>
            <p className="mt-2 opacity-70">{genre.short_description}</p>
        </div>
    );
};
