import { useEffect, useState } from 'react';
import './Search.css';
import { Navbar } from '../../components/Navbar';
import { TrackSearch } from '../../components/Search/track';
import { getNewToken, getSpotifyToken } from '../../utils/tokenGen';
import { searchUser } from '../../services/search';
import { UserSearch } from '../../components/Search/user';
import { ArtistSearch } from '../../components/Search/artist';
import { AlbumSearch } from '../../components/Search/album';
import { MetaWrapper } from '../../components/Util/MetaWrapper';
import { useSearchParams } from 'react-router-dom';

type Category = 'Track' | 'Artist' | 'Album' | 'Username'
type Params = 'query' | 'category'

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
    const category = searchParams.get('category') as Category | null;
    const [searchCategory, setSearchCategory] = useState<Category>(category ? category : 'Track');
    const [searchInput, setSearchInput] = useState(query ? query : '');
    const [access_token, setAccess_token] = useState(getSpotifyToken());
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const url = `https://api.spotify.com/v1/search?q=${searchInput}&type=${searchCategory.toLowerCase()}`;
    let encodedURI = encodeURI(url);

    useEffect(() => {
        if (searchInput.length === 0) {
            setResult([]);
        }

        if (searchInput.length > 1 && searchCategory !== 'Username') {
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
                        const category = searchCategory.toLowerCase() + 's';
                        setIsLoading(false);
                        setResult(data[category].items);
                    }
                });
        } else if (searchInput.length > 1) {
            const userSearch = async () => {
                setIsLoading(true);
                const userSearch = await searchUser(searchInput);
                setIsLoading(false);
                setResult(userSearch.request);
            };
            userSearch();
        }
    }, [searchCategory, searchInput]);

    const updateCategory = (value: Category) => {
        setSearchInput('');
        updateSearchParameter('category', value);
        setSearchCategory(value);
    }

    const updateSearchInput = (value: string ) => {
        updateSearchParameter('query', value);
        setSearchInput(value);
    };

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
                            <span>{searchCategory}</span>
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-30"
                        >
                            <li
                                onClick={() => {
                                    updateCategory('Track');
                                }}
                            >
                                <a>Song</a>
                            </li>
                            <li
                                onClick={() => {
                                    updateCategory('Artist');
                                }}
                            >
                                <a>Artist</a>
                            </li>
                            <li
                                onClick={() => {
                                    updateCategory('Album');
                                }}
                            >
                                <a>Album</a>
                            </li>
                            <li
                                onClick={() => {
                                    updateCategory('Username')
                                }}
                            >
                                <a>People</a>
                            </li>
                        </ul>
                    </div>

                    <input
                        type="text"
                        placeholder={`Search by ${searchCategory}`}
                        value={searchInput}
                        onChange={(e) => {
                            updateSearchInput(e.target.value)
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
                    {searchInput.length > 1 &&
                        (() => {
                            switch (searchCategory) {
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
                    {searchInput.length > 1 && result.length < 1 && (
                        <p className="text text-xl mt-20">No results ...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchPage;
