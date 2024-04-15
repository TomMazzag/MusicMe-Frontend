import { useEffect, useState } from "react"
import "./Account.css"
import { getNewToken } from "../../utils/tokenGen"
import { Navbar } from "../../components/Navbar"

export const UsersAccount = () => {
    const [access_token, setAccess_token] = useState(localStorage.getItem("access_token"))
    const [profile, setProfile] = useState()
    const [playlists, setPlaylists] = useState()

    const getPlaylists = async (id: string) => {
        const result = await fetch(`https://api.spotify.com/v1/users/${id}/playlists?offset=0&limit=50`, {
            method: "GET", headers: { Authorization: `Bearer ${access_token}` }
        })
        const data = await result.json()
        const publicPlaylists = data.items.filter(item => item.public === true);
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
                    getNewToken().then(setAccess_token(localStorage.getItem("access_token"))!)
                } 
            } else {
                setProfile(data)
                //console.log(data)
                getPlaylists(data.id)
            }
        }
        getProfile()
    }, [access_token])

    return (
        <>
            <Navbar />
            <h1>My Account</h1>
            {profile ?
            <div className="profile">
                <div className="account-details-container">
                    <img src={profile.images[1].url} alt="" className="profile-pic"/>
                    <div className="account-details">
                        <h2 className="username">{profile.display_name}</h2>
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
                        <p>Current Favorite Song: Alone - Sainté</p>
                        <p>1452 songs linked</p>
                    </div>
                </div>

                {playlists &&
                <div className="playlists">
                    {playlists.map((playlist, index) => (
                        <div key={index} className="playlist-tile">
                            <a href={playlist.external_urls.spotify} target="_blank"><img src={playlist.images[0].url} alt="" /></a>
                            <h4>{playlist.name}</h4>
                        </div>
                    ))}
                </div>}
            </div> : <p>Loading Profile...</p>
            }
        </>
    )
}