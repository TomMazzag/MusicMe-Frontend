export const TrackSearch = ({result}: any) => {
    //console.log(result)
    return (
        <>
            {result.map((result: any, index: number) => (
                <div className="result-tile" key={index}>
                    <a href={`/songs/${result.id}`} className="flex gap-5 items-center grow">
                        <img src={result.album && result.album.images && result.album.images.length > 0 ? result.album.images[0].url : ""} alt="" />
                        <div className="result-text">
                            <h3>{result.name}</h3>
                            <p>{result.artists[0].name}</p>
                        </div>
                        <div className="repost">
                            <i className="fa-solid fa-share"></i>
                            <p>Repost</p>
                        </div>
                    </a>
                    <a href={result.external_urls.spotify} target="_blank" ><i className="fa-brands fa-spotify fa-2xl px-2"></i></a>
                </div>
            ))}
        </>
    )
};
