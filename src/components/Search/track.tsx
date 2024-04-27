export const TrackSearch = ({result}: any) => {
    //console.log(result)
    return (
        <>
            {result.map((result: any, index: number) => (
                <a href={`/songs/${result.id}`} className="result-tile" key={index}>
                    <img src={result.album && result.album.images && result.album.images.length > 0 ? result.album.images[0].url : ""} alt="" />
                    <div className="result-text">
                        <h3>{result.name}</h3>
                        <p>{result.artists[0].name}</p>
                    </div>
                    <div className="repost">
                        <i className="fa-solid fa-share"></i>
                        <p>Repost</p>
                    </div>
                    <a href={result.external_urls.spotify} target="_blank" ><i className="fa-brands fa-spotify fa-2xl"></i></a>
                </a>
            ))}
        </>
    )
};
