export const ArtistSearch = ({ result }: any) => {
    //console.log(result)
    return (
        <>
            {result.map((artist: any) => (
                <div key={artist.id} className="flex h-[120px] md:h-[150px] w-[92%] md:w-[65%] items-center">
                    <a href={`/artist/${artist.id}`} className="flex-grow flex h-full items-center text-center">
                        <img
                            src={artist.images && artist.images.length > 0 ? artist.images[0].url : ''}
                            alt="artist-image"
                            className="h-full w-[120px] md:w-[150px]"
                        />
                        <p className="text text-2xl md:text-4xl font-medium tracking-wide flex-grow">{artist.name}</p>
                    </a>
                    <a href={artist.external_urls.spotify} target="_blank" className="px-2">
                        <i className="fa-brands fa-spotify fa-2xl"></i>
                    </a>
                </div>
            ))}
        </>
    );
};
