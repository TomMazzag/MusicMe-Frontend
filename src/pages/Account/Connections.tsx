import { useParams } from 'react-router-dom';
import { UserProfileTile } from '../../components/Account/UserProfileTile';
import { Navbar } from '@MusicMe/components/navbar';
import { useEffect, useState } from 'react';
import { getFollowers, getFollowing } from '../../services/friend';
import { Profile } from '../../types/Profile';
import { getCurrentUserId, getPlatformToken } from '@MusicMe/utils';

interface ConnnecitonProps {
    ConnectionType: string;
}

interface User {
    full_name: string;
}

export const Connections = ({ ConnectionType }: ConnnecitonProps) => {
    const { user_id } = useParams();
    const platform_token = getPlatformToken();
    const [connections, setConnections] = useState([]);
    const [user, setUser] = useState<User>();
    const currentUserId = getCurrentUserId(platform_token);
    const dataFunction = ConnectionType === 'following' ? getFollowing : getFollowers;

    useEffect(() => {
        dataFunction(platform_token, user_id!).then((data) => {
            console.log(data);
            setConnections(data.friends);
            setUser(data.user);
        });
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex items-center p-5 md:p-10 flex-col">
                {user && connections ? (
                    <>
                        <p className="text text-l md:text-2xl">
                            Showing {ConnectionType} for {user.full_name}
                        </p>

                        <div className="flex flex-col w-full gap-3 py-5 md:w-[50%]">
                            {connections.length > 0 ? (
                                connections.map((connection: Profile.Conneciton) => (
                                    <UserProfileTile
                                        key={connection.user_id}
                                        user_id={connection.user_id}
                                        full_name={connection.full_name}
                                        profile_picture_url={connection.profile_picture_url}
                                        username={connection.username}
                                        is_following={connection.is_following}
                                        currentUserId={currentUserId}
                                    />
                                ))
                            ) : (
                                <p className="text text-center py-20">No {ConnectionType} found</p>
                            )}
                        </div>
                    </>
                ) : (
                    <>Loading...</>
                )}
            </div>
        </div>
    );
};
