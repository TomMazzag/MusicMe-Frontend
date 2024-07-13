export const LikedSongsTab = ({ likedSongs }: any) => {
    return (
        <>
            {likedSongs.map((song: any, index: number) => (
                <div className="result-tile w-[90%] mb-10" key={index}>
                    <a href={`/songs/${song.id}`} className="flex gap-5 items-center grow">
                        <img src={song.image} alt="" />
                        <div className="result-text">
                            <h3>{song.name}</h3>
                            <p>{song.artists[0].name}</p>
                        </div>
                        <div className="repost text-center">
                            <i className="fa-solid fa-share"></i>
                            <p>Repost</p>
                        </div>
                    </a>
                    <a href={song.url} target="_blank" ><i className="fa-brands fa-spotify fa-2xl px-2"></i></a>
                </div>
            ))}
        </>
    )
}