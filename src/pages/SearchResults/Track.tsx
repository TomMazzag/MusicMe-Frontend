import { useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getNewToken } from "../../utils/tokenGen";

export const TrackPage = () => {
    const {songId} = useParams()
    const [access_token, setAccess_token] = useState(localStorage.getItem("access_token"))
    const [song, setSong] = useState<any>()
    
    useEffect(() => {
        fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
            method: "GET", headers: { Authorization: `Bearer ${access_token}` }
        })
        .then(response => response.json())
        .then(async (data) => {
            if(data.error) {
                //console.log(data.error)
                if (data.error.status === 401) {
                    console.log("Generating new token")
                    const newToken = await getNewToken()
                    setAccess_token(newToken!)
                } 
            } else {
                //console.log(data)
                setSong(data)
            }
        })
    }, [])

    return (
        <>
            <Navbar />
            <div className="flex items-center flex-col justify-between h-[90vh] w-full">
                {song ? 
                <>
                    <div className="flex gap-5 mt-10">
                        <img src={song.album.images[0].url} alt="" className="h-[200px]"/>
                        <div className="flex flex-col justify-center text-center gap-4">
                            <h1 className="text text-4xl font-semibold">{song.name}</h1>
                            {song.artists.map((artist: any, index: number) => (
                                <h2 key={index} className="text text-xl opacity-60">{artist.name}</h2>
                            ))}
                        </div>
                    </div> 
                    <div className="song-comments">
                        <p>Be the first to leave a comment about this song.</p>
                    </div>
                    <div className="w-full flex justify-center mb-4">
                        <input 
                            type="text" 
                            placeholder="This song reminds me of..." 
                            id="comment-input"
                            className="input input-bordered w-[70%]"
                        
                        />
                    </div>
                </>
                : 
                <div className="skeleton h-[200px] w-[40%] mt-10"></div>
                }
            </div>
        </>
    )
};
