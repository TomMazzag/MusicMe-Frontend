import { useEffect, useState } from "react"
import "./Account.css"
import { getNewToken } from "../../utils/tokenGen"
import { Navbar } from "../../components/Navbar"
import { useParams } from "react-router-dom";
import { getAccountDetailsPublicAccount } from "../../services/account";
import { followOrUnfollowUser } from "../../services/friend";


interface PublicProfile {
    full_name: string;
    profile_picture_url: string;
    followers: number;
    following: number;
    liked_song_count: number;
    user_id: string;
}

interface Playlist {
    public: boolean;
}

export const PublicAccount = () => {
    const [access_token, setAccess_token] = useState(localStorage.getItem("access_token"))
    const platform_token = localStorage.getItem("platform_token")
    const [profile, setProfile] = useState<PublicProfile>()
    const [playlists, setPlaylists] = useState<any>()
    const [activeTab, setActiveTab] = useState<string>("Playlists")
    let { user_id } = useParams();
    const [following, setFollowing] = useState(false)

    const getPlaylists = async (id: string) => {
        const result = await fetch(`https://api.spotify.com/v1/users/${id}/playlists?offset=0&limit=50`, {
            method: "GET", headers: { Authorization: `Bearer ${access_token}` }
        })
        const data = await result.json()
        if(data.error) {
            if (data.error.status === 401) {
                const newToken = await getNewToken()
                setAccess_token(newToken!)
                return
            } 
        }
        const publicPlaylists = data.items.filter((item: Playlist) => item.public === true);
        // console.log(publicPlaylists) 
        setPlaylists(publicPlaylists)
    }

    const followUser = async () => {
        followOrUnfollowUser(platform_token!, profile!.user_id)
        setFollowing(!following)
    }

    useEffect(() => {
        const getProfile = async () => {
            getAccountDetailsPublicAccount(platform_token!, user_id!)
            .then((data) => {
                console.log(data.userDetails)
                if (data.userDetails.is_following_this_account === "1") {
                    setFollowing(true)
                }
                setProfile(data.userDetails)
                getPlaylists(data.userDetails.spotify_id)
            })
        }
        getProfile()
    }, [access_token])

    function shortenString(str: string, maxLength: number) {
        if (str.length <= maxLength) {
            return str;
        } else {
            return str.slice(0, maxLength) + '...';
        }
    }

    return (
        <>
            <Navbar />
            {profile ?
            <div className="profile mt-10">
                <div className="account-details-container flex-col md:flex-row">
                    <img src={profile.profile_picture_url} alt="" className="profile-pic w-[300px] h-[300px] object-cover"/>
                    <div className="account-details">
                        <h2 className="text-3xl font-bold text-center mb-5">{profile.full_name}</h2>
                        <div className="follower-count">
                            <div className="followers">
                                <a href={`/user/${profile.user_id}/followers`}>
                                    <h2>{profile.followers}</h2>
                                    <p>Followers</p>
                                </a>
                            </div>
                            <div className="following">
                                <a href={`/user/${profile.user_id}/following`}>
                                    <h2>{profile.following}</h2>
                                    <p>Following</p>
                                </a>
                            </div>
                            <div className="following">
                                <a href={`/user/${profile.user_id}/reviews`}>
                                    <h2>5</h2>
                                    <p>Reviews</p>
                                </a>
                            </div>
                        </div>
                        <p className="text-center mt-5 mb-2">Current Favorite Song: Alone - Sainté</p>
                        <p className="text-center">{profile.liked_song_count} songs lined</p>
                        <button 
                            className={`btn btn-sm w-[80%] self-center mt-5 ${following && "btn-primary"}`}
                            onClick={followUser}
                        >{following ? "Following" : "Follow"}</button>
                    </div>
                </div>

                <div role="tablist" className="tabs tabs-boxed mb-10">
                    <a 
                        role="tab" 
                        className={`tab ${activeTab === "Playlists" ? "tab-active" : ""}`} 
                        onClick={() => setActiveTab("Playlists")}
                    >Playlists</a>
                    <a 
                        role="tab" 
                        className={`tab ${activeTab === "Liked" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("Liked")}
                    >Liked songs</a>
                    <a 
                        role="tab" 
                        className={`tab ${activeTab === "Feed" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("Feed")}
                    >Feed</a>
                </div>

                {playlists &&
                <div className="playlists mb-20">
                    {playlists.map((playlist: any, index: number) => (
                        <div key={index} className="playlist-tile text-center">
                            <a href={playlist.external_urls.spotify} target="_blank"><img src={playlist.images ? playlist.images[0].url : ""} alt="Playlist artwork" className="border-none rounded-xl"/></a>
                            <h4 className="mt-5">{shortenString(playlist.name, 35)}</h4>
                        </div>
                    ))}
                </div>}
            </div> : <p className="text text-center mt-20 text-2xl">Loading Profile...</p>
            }
        </>
    )
}