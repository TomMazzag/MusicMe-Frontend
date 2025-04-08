import { useEffect, useState } from 'react';
import './Search.css';
import { Navbar } from '@MusicMe/components/navbar';
import { TrackSearch } from '../../components/Search/track';
import { getNewToken, getSpotifyToken } from '@MusicMe/utils';
import { searchUser } from '../../services/search';
import { UserSearch } from '../../components/Search/user';
import { ArtistSearch } from '../../components/Search/artist';
import { AlbumSearch } from '../../components/Search/album';
import { MetaWrapper } from '../../components/Util/MetaWrapper';
import { useSearchParams } from 'react-router-dom';

type Category = 'Track' | 'Artist' | 'Album' | 'Username';
type Params = 'query' | 'category';

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const category = (searchParams.get('category') as Category) || 'Track';
    const [access_token, setAccess_token] = useState(getSpotifyToken());
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const url = `https://api.spotify.com/v1/search?q=${query}&type=${category.toLowerCase()}`;
    let encodedURI = encodeURI(url);

    useEffect(() => {
        if (query.length === 0) {
            setResult([]);
        }

        if (query.length > 1 && category !== 'Username') {
            setIsLoading(true);
            fetch(encodedURI, {
                method: 'GET',
                headers: { Authorization: `Bearer ${access_token}` },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        if (data.error.status === 401) {
                            console.log('Generating new token');
                            getNewToken().then((newToken) => setAccess_token(newToken));
                            return;
                        }
                    } else {
                        const transformedCategory = category.toLowerCase() + 's';
                        setIsLoading(false);
                        setResult(data[transformedCategory].items);
                    }
                });
        } else if (query.length > 1) {
            const userSearch = async () => {
                setIsLoading(true);
                const userSearch = await searchUser(query);
                setIsLoading(false);
                setResult(userSearch.request);
            };
            userSearch();
        }
    }, [category, query]);

    const updateSearchParameter = (parameter: Params, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(parameter, value);
        setSearchParams(newParams);
    };

    return (
        <>
            <MetaWrapper title="Search" />
            <Navbar />
            <div className="search-page">
                <div className="search-bar w-[90%] md:w-[60%]">
                    <div className="dropdown dropdown-hover">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn border-none bg-transparent my-0 rounded-bl-full rounded-tl-full h-10 min-h-1 pr-0"
                        >
                            <span>{category}</span>
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-30"
                        >
                            <li
                                onClick={() => {
                                    updateSearchParameter('category', 'Track');
                                }}
                            >
                                <a>Song</a>
                            </li>
                            <li
                                onClick={() => {
                                    updateSearchParameter('category', 'Artist');
                                }}
                            >
                                <a>Artist</a>
                            </li>
                            <li
                                onClick={() => {
                                    updateSearchParameter('category', 'Album');
                                }}
                            >
                                <a>Album</a>
                            </li>
                            <li
                                onClick={() => {
                                    updateSearchParameter('category', 'Username');
                                }}
                            >
                                <a>People</a>
                            </li>
                        </ul>
                    </div>

                    <input
                        type="text"
                        placeholder={`Search by ${category}`}
                        value={query}
                        onChange={(e) => {
                            updateSearchParameter('query', e.target.value);
                        }}
                    />
                    <button>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div className="results mb-10 w-full md:w-[70%]">
                    {isLoading && (
                        <>
                            <div className="skeleton h-28 w-2/3"></div>
                            <div className="skeleton h-28 w-2/3"></div>
                            <div className="skeleton h-28 w-2/3"></div>
                            <div className="skeleton h-28 w-2/3"></div>
                        </>
                    )}
                    {query.length > 1 &&
                        (() => {
                            switch (category) {
                                case 'Track':
                                    return <TrackSearch result={result} />;
                                case 'Artist':
                                    return <ArtistSearch result={result} />;
                                case 'Album':
                                    return <AlbumSearch result={result} />;
                                case 'Username':
                                    return <UserSearch result={result} />;
                            }
                        })()}
                    {query.length > 1 && result.length < 1 && <p className="text text-xl mt-20">No results ...</p>}
                </div>
            </div>
        </>
    );
};

export default SearchPage;
