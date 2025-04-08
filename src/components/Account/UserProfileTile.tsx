import { useState } from 'react';
import { followOrUnfollowUser } from '../../services/friend';
import { Profile } from '../../types/Profile';
import { getPlatformToken } from '@MusicMe/utils';

export const UserProfileTile = ({
    user_id,
    full_name,
    profile_picture_url,
    username,
    is_following,
    currentUserId,
}: Profile.Conneciton) => {
    const [following, setFollowing] = useState(is_following);
    const platform_token = getPlatformToken();

    const followUser = async () => {
        followOrUnfollowUser(platform_token, user_id);
        setFollowing(!following);
    };

    return (
        <div className="flex justify-between py-2 px-2">
            <a
                className="flex gap-4 cursor-pointer flex-grow"
                href={currentUserId !== user_id ? `/user/${user_id}` : '/account'}
            >
                <img src={profile_picture_url} alt="" className="w-[80px] h-[80px] object-cover rounded-[50%]" />
                <div className="flex flex-col justify-center">
                    <h3>{full_name}</h3>
                    <p className="opacity-55">{username}</p>
                </div>
            </a>
            {currentUserId !== user_id && (
                <button
                    className={`btn btn-sm self-center px-6 border-primary ${!is_following && 'btn-primary'}`}
                    onClick={followUser}
                >
                    {following ? 'Following' : 'Follow'}
                </button>
            )}
        </div>
    );
};
