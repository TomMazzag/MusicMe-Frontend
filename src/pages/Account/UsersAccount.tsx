import { useEffect, useState } from 'react';
import './Account.css';
import { getNewToken, getPlatformToken, getSpotifyToken } from '@MusicMe/utils';
import { Navbar } from '@MusicMe/components/navbar';
import { getAccountDetailsUsersAccount, getUsersLikedSongs } from '../../services/account';
import { LikedSongsTab } from '../../components/LikedSongs/LikedSongsTab';
import { Profile } from '../../types/Profile';
import { MetaWrapper } from '../../components/Util/MetaWrapper';
import { AnalyticsTile } from '../../components/Account/Analytics/AnalyticsTile';
import { Tablist } from '../../components/Account/Tablist';
import { ProfileImageAndNumbers } from '../../components/Account/ProfilePicAndUserStats';
import { ActiveTab } from '@MusicMe/types';
import { useSearchParams } from 'react-router-dom';
import { updateSearchParams } from 'src/utils/searchParams';
import { PlaylistsTab } from 'src/components/Account/PlaylistTab';

interface Playlist {
    public: boolean;
}

export const UsersAccount = () => {
    const [access_token, setAccess_token] = useState(getSpotifyToken());
    const [profile, setProfile] = useState<Profile.User>();
    const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectFull[] | undefined>();
    const platform_token = getPlatformToken();
    const [likedSongs, setLikedSongs] = useState([{}]);
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab: ActiveTab | null = searchParams.get('activeTab')
        ? (searchParams.get('activeTab') as ActiveTab)
        : 'Playlists';

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
                getNewToken().then((newToken) => setAccess_token(newToken!));
                return;
            }
        }
        const publicPlaylists = data.items.filter((item: Playlist) => item.public === true);
        //console.log(publicPlaylists)
        setPlaylists(publicPlaylists);
    };

    useEffect(() => {
        const getProfile = async () => {
            getAccountDetailsUsersAccount(platform_token).then((data) => {
                setProfile(data.userDetails);
                //console.log(data)
                getPlaylists(data.userDetails.spotify_id);
            });
            getUsersLikedSongs(platform_token, access_token!).then((data: any) => setLikedSongs(data.likedSongs));
            return;
        };
        getProfile();
        return;
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
                        playlistCount: playlists?.length || 0,
                        likedSongs: profile?.liked_song_count,
                    }}
                />
            );
            break;
    }

    return (
        <>
            <MetaWrapper title="My Account" />
            <Navbar />
            {profile ? (
                <div className="profile mt-5">
                    <div className="flex mb-[35px] flex-col">
                        <ProfileImageAndNumbers profile={profile} />
                    </div>

                    <Tablist activeTab={activeTab} setActiveTab={setActiveTab} tabContent={tabContent} />
                </div>
            ) : (
                <p className="text text-center mt-20 text-2xl">Loading Profile...</p>
            )}
        </>
    );
};
