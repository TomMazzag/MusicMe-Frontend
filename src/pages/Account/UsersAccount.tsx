import { useEffect, useState } from "react"
import "./Account.css"
import { getNewToken } from "../../utils/tokenGen"
import { Navbar } from "../../components/Navbar"


interface Image {
    url: string;
}

interface Profile {
    display_name: string;
    id: string;
    images: Image[];
}

interface Playlist {
    public: boolean;
}

export const UsersAccount = () => {
    const [access_token, setAccess_token] = useState(localStorage.getItem("access_token"))
    const [profile, setProfile] = useState<Profile>()
    const [playlists, setPlaylists] = useState<any>()
    const [activeTab, setActiveTab] = useState<string>("Playlists")

    const getPlaylists = async (id: string) => {
        const result = await fetch(`https://api.spotify.com/v1/users/${id}/playlists?offset=0&limit=50`, {
            method: "GET", headers: { Authorization: `Bearer ${access_token}` }
        })
        const data = await result.json()
        const publicPlaylists = data.items.filter((item: Playlist) => item.public === true);
        console.log(publicPlaylists)
        // console.log(publicPlaylists) 
        setPlaylists(publicPlaylists)
    }

    useEffect(() => {
        const getProfile = async () => {
            const result = await fetch("https://api.spotify.com/v1/me", {
                method: "GET", headers: { Authorization: `Bearer ${access_token}` }
            })
            const data = await result.json()
            if(data.error) {
                if (data.error.status === 401) {
                    console.log("Generating new token")
                    getNewToken()
                    .then(
                        setAccess_token(localStorage.getItem("access_token"))!
                    )
                    getProfile()
                } 
            } else {
                setProfile(data)
                //console.log(data)
                getPlaylists(data.id)
            }
        }
        getProfile()
    }, [access_token])

    function shortenString(str: string, maxLength: number) {
    if (str.length <= maxLength) {
        return str; // Return the original string if it's within the limit
    } else {
        return str.slice(0, maxLength) + '...'; // Truncate the string and add ellipsis
    }
}

    return (
        <>
            <Navbar />
            <h1 className="text-6xl font-bold mb-10 mt-10 text-center">My Account</h1>
            {profile ?
            <div className="profile">
                <div className="account-details-container">
                    <img src={profile.images[1].url} alt="" className="profile-pic"/>
                    <div className="account-details">
                        <h2 className="text-3xl font-bold text-center mb-5">{profile.display_name}</h2>
                        <div className="follower-count">
                            <div className="followers">
                                <a href={`/user/${profile.id}/followers`}>
                                    <h2>87</h2>
                                    <p>Followers</p>
                                </a>
                            </div>
                            <div className="following">
                                <a href={`/user/${profile.id}/following`}>
                                    <h2>100</h2>
                                    <p>Following</p>
                                </a>
                            </div>
                            <div className="following">
                                <a href={`/user/${profile.id}/reviews`}>
                                    <h2>5</h2>
                                    <p>Reviews</p>
                                </a>
                            </div>
                        </div>
                        <p className="text-center mt-5 mb-2">Current Favorite Song: Alone - Sainté</p>
                        <p className="text-center">1452 songs linked</p>
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
                            <a href={playlist.external_urls.spotify} target="_blank"><img src={playlist.images[0].url} alt="Playlist artwork" className="border-none rounded-xl"/></a>
                            <h4 className="mt-5">{shortenString(playlist.name, 35)}</h4>
                        </div>
                    ))}
                </div>}
            </div> : <p className="text text-center mt-20 text-2xl">Loading Profile...</p>
            }
        </>
    )
}