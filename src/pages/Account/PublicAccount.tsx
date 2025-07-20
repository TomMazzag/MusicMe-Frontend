import { useEffect, useState } from 'react';
import './Account.css';
import { getNewToken, getPlatformToken, getSpotifyToken } from '@MusicMe/utils';
import { Navbar } from '@MusicMe/components/navbar';
import { useParams, useSearchParams } from 'react-router-dom';
import { getAccountDetailsPublicAccount } from '../../services/account';
import { followOrUnfollowUser } from '../../services/friend';
import { Profile } from '../../types/Profile';
import { LikedSongsTab } from '../../components/LikedSongs/LikedSongsTab';
import { Tablist } from '../../components/Account/Tablist';
import { AnalyticsTile } from '../../components/Account/Analytics/AnalyticsTile';
import { ProfileImageAndNumbers } from '../../components/Account/ProfilePicAndUserStats';
import { ActiveTab } from '@MusicMe/types';
import { updateSearchParams } from 'src/utils/searchParams';
import { PlaylistsTab } from 'src/components/Account/PlaylistTab';

interface Playlist {
    public: boolean;
}

export const PublicAccount = () => {
    const [access_token, setAccess_token] = useState(getSpotifyToken());
    const platform_token = getPlatformToken();
    const [profile, setProfile] = useState<Profile.Public>();
    const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectFull[] | undefined>();
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab: ActiveTab | null = searchParams.get('activeTab')
        ? (searchParams.get('activeTab') as ActiveTab)
        : 'Playlists';
    let { user_id } = useParams();
    const [following, setFollowing] = useState(false);
    const [likedSongs] = useState([]);

    if (user_id === undefined) {
        return (window.location.href = '/account');
    }

    const setActiveTab = (newTab: ActiveTab) => {
        updateSearchParams<ActiveTab>('activeTab', newTab, searchParams, setSearchParams);
    };

    const getPlaylists = async (id: string) => {
        const result = await fetch(`https://api.spotify.com/v1/users/${id}/playlists?offset=0&limit=50`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const data = await result.json();
        if (data.error) {
            if (data.error.status === 401) {
                const newToken = await getNewToken();
                setAccess_token(newToken!);
                return;
            }
        }
        const publicPlaylists = data.items.filter((item: Playlist) => item.public === true);
        // console.log(publicPlaylists)
        setPlaylists(publicPlaylists);
    };

    const followUser = async () => {
        followOrUnfollowUser(platform_token, profile!.user_id);
        setFollowing(!following);
    };

    useEffect(() => {
        const getProfile = async () => {
            getAccountDetailsPublicAccount(platform_token, user_id!).then((data) => {
                console.log(data.userDetails);
                if (data.userDetails.is_following_this_account === '1') {
                    setFollowing(true);
                }
                setProfile(data.userDetails);
                getPlaylists(data.userDetails.spotify_id);
            });
        };
        getProfile();
    }, [access_token]);

    let tabContent;

    switch (activeTab) {
        case 'Playlists':
            tabContent = <PlaylistsTab playlists={playlists} />;
            break;
        case 'Liked':
            tabContent = <LikedSongsTab likedSongs={likedSongs} />;
            break;
        case 'Analytics':
            tabContent = (
                <AnalyticsTile
                    data={{
                        playlistCount: playlists?.length,
                        likedSongs: profile?.liked_song_count,
                    }}
                    profile={profile}
                />
            );
            break;
    }

    return (
        <>
            <Navbar />
            {profile ? (
                <div className="profile mt-10">
                    <div className="flex mb-[35px] flex-col">
                        <ProfileImageAndNumbers profile={profile} />
                        <button
                            className={`btn btn-sm w-[80%] self-center mt-5 border-primary ${
                                !following && 'btn-primary'
                            }`}
                            onClick={followUser}
                        >
                            {following ? 'Following' : 'Follow'}
                        </button>
                    </div>

                    <Tablist activeTab={activeTab} setActiveTab={setActiveTab} tabContent={tabContent} />
                </div>
            ) : (
                <p className="text text-center mt-20 text-2xl">Loading Profile...</p>
            )}
        </>
    );
};
