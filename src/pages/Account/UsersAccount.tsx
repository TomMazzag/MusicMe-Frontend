import { useEffect, useState } from 'react';
import './Account.css';
import { getNewToken, getPlatformToken, getSpotifyToken } from '../../utils/tokenGen';
import { Navbar } from '../../components/Navbar';
import { getAccountDetailsUsersAccount, getUsersLikedSongs } from '../../services/account';
import { LikedSongsTab } from '../../components/LikedSongs/LikedSongsTab';
import { shortenString } from '../../utils/stringShorten';
import { UsersProfile } from '../../types/Profile';
import { MetaWrapper } from '../../components/Util/MetaWrapper';
import { AnalyticsTile } from '../../components/Account/Analytics/AnalyticsTile';
import { Tablist } from '../../components/Account/Tablist';
import { ProfileImageAndNumbers } from '../../components/Account/ProfilePicAndUserStats';

interface Playlist {
    public: boolean;
}

export const UsersAccount = () => {
    const [access_token, setAccess_token] = useState(getSpotifyToken());
    const [profile, setProfile] = useState<UsersProfile>();
    const [playlists, setPlaylists] = useState<any>();
    const [activeTab, setActiveTab] = useState<string>('Playlists');
    const platform_token = getPlatformToken();
    const [likedSongs, setLikedSongs] = useState([{}]);

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
            tabContent = playlists && (
                <div className="playlists mb-20 grid-cols-1 md:grid-cols-3">
                    {playlists.map((playlist: any, index: number) => (
                        <div key={index} className="playlist-tile text-center">
                            <a href={playlist.external_urls.spotify} target="_blank">
                                <img
                                    src={playlist.images?.[0].url || undefined}
                                    alt="Playlist artwork"
                                    className="border-none rounded-xl"
                                />
                            </a>
                            <h4 className="mt-5">{shortenString(playlist.name, 35)}</h4>
                        </div>
                    ))}
                </div>
            );
            break;
        case 'Liked':
            tabContent = <LikedSongsTab likedSongs={likedSongs} />;
            break;
        case 'Analytics':
            tabContent = (
                <AnalyticsTile
                    data={{
                        playlistCount: playlists.length || 0,
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
