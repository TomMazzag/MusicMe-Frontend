import { QueryClient } from '@tanstack/react-query';
import { deleteReview } from '../../services/rewiew';
import { getPlatformToken } from '@MusicMe/utils';

interface OptionsProps {
    reviewId: number;
    queryClient: QueryClient;
}

export const ReviewBoxUserOptions = ({ reviewId, queryClient }: OptionsProps) => {
    const platform_token = getPlatformToken();

    const deleteClick = async () => {
        await deleteReview(platform_token, reviewId);
        queryClient.invalidateQueries({ queryKey: ['reviews'] });
    };

    return (
        <div className="dropdown dropdown-end absolute top-[-3px] right-[0px] md:right-[10px] h-0 z-50">
            <div tabIndex={0} role="button" className="btn m-1 rounded-full h-0">
                <i className="fa-solid fa-ellipsis"></i>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-22 p-2 shadow">
                <button className="btn btn-sm">Edit</button>
                <button className="btn btn-sm" onClick={deleteClick}>
                    Delete
                </button>
            </ul>
        </div>
    );
};
