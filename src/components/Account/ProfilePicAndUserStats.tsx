import { Profile } from '../../types/Profile';

export const ProfileImageAndNumbers = ({ profile }: { profile: Profile.User }) => {
    return (
        <div className="flex px-4 mb-4">
            <img
                src={profile.profile_picture_url}
                alt=""
                className="rounded-full w-[32vw] h-[32vw] mr-4 lg:w-[15vw] lg:h-[15vw] lg:mr-10 object-cover"
            />
            <div className="account-details flex-grow flex items-center gap-5">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">{profile.full_name}</h2>
                    <p className="opacity-70">@{profile.username}</p>
                </div>
                <div className="follower-count text-center">
                    <div>
                        <a href={`/user/${profile.user_id}/followers`}>
                            <h2>{profile.followers}</h2>
                            <p className="text-sm">followers</p>
                        </a>
                    </div>
                    <div>
                        <a href={`/user/${profile.user_id}/following`}>
                            <h2>{profile.following}</h2>
                            <p className="text-sm">following</p>
                        </a>
                    </div>
                    <div>
                        <a href={`/user/${profile.user_id}/reviews`}>
                            <h2>{profile.review_count}</h2>
                            <p className="text-sm">reviews</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
