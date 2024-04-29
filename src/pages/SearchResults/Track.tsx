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
            <div className="flex items-center flex-col justify-between h-[90vh] w-full p-4 text-center md:p-0">
                {song ? 
                <>
                    <div className="flex gap-5 flex-row items-center md:mt-10">
                        <img src={song.album.images[0].url} alt="" className="h-[150px] w-[150px]"/>
                        <div className="flex flex-col justify-center text-center gap-2 md:gap-4">
                            <h1 className="text text-xl font-semibold md:text-4xl">{song.name}</h1>
                            <h2 className="text text-xl opacity-60 md:text-3xl">{song.artists.map((artist: any) => artist.name).join(', ')}</h2>
                            <p className="text text-xl">5 Likes</p>
                        </div>
                    </div> 
                    <div className={`flex grow ${1 === 1 && "items-center w-[75%] md:w-full" /* Add logic for if theres no comments */}`}>
                        <p className="grow">No comments yet! Be the first to leave a comment about this song</p>
                    </div>
                    <div className="w-full flex justify-center md:mb-4">
                        <input 
                            type="text" 
                            placeholder="This song reminds me of..." 
                            id="comment-input"
                            className="input input-bordered w-full rounded-3xl md:w-[70%]"
                        
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
