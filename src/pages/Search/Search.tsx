import { useEffect, useState } from "react"
import "./Search.css"
import { Navbar } from "../../components/Navbar"
import { TrackSearch } from "../../components/Search/track"
import { getNewToken } from "../../utils/tokenGen"
import { searchUser } from "../../services/search"
import { UserSearch } from "../../components/Search/user"

const SearchPage = () => {
    const [searchCategory, setSearchCategory] = useState("Track")
    const [searchInput, setSearchInput] = useState("")
    const [access_token, setAccess_token] = useState(localStorage.getItem("access_token"))
    const [result, setResult] = useState([])

    const url = `https://api.spotify.com/v1/search?q=${searchInput}&type=${searchCategory.toLowerCase()}`
    let encodedURI = encodeURI(url)
    
    useEffect(() => {
        if (searchInput.length > 1 && searchCategory !== "Username") {
            fetch(encodedURI, {
                method: "GET", headers: { Authorization: `Bearer ${access_token}` }
            })
            .then(response => response.json())
            .then((data) => {
                if(data.error) {
                    if (data.error.status === 401) {
                        console.log("Generating new token")
                        getNewToken().then(setAccess_token(localStorage.getItem("access_token"))!)
                    } 
                } else {
                    const category = searchCategory.toLowerCase() + "s"
                    setResult(data[category].items)
                }
            })
        } else if (searchInput.length > 1) {
            const userSearch = async () => {
                const userSearch = await searchUser(searchInput)
                setResult(userSearch.request)
            }
            userSearch()
        }
    }, [searchCategory, searchInput])


    return (
        <>
            <Navbar />
            <div className="search-page">

                <div className="search-bar"> 
                    

                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="btn border-none bg-transparent my-0 rounded-bl-full rounded-tl-full h-10 min-h-1">
                            <span>{searchCategory}</span>
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-30">
                            <li onClick={() => {setSearchCategory("Track");}}><a>Song</a></li>
                            <li onClick={() => {setSearchCategory("Artist");}}><a>Artist</a></li>
                            <li onClick={() => {setSearchCategory("Album");}}><a>Album</a></li>
                            <li onClick={() => {setSearchCategory("Username");}}><a>People</a></li>
                        </ul>
                    </div>

                    <input type="text" placeholder={`Search by ${searchCategory}`} value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}}/>
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className="results">
                    {result.length >= 1 && (
                        (() => {
                            switch(searchCategory) {
                            case "Track":
                                return <TrackSearch result={result} />;
                            case "Username":
                                return <UserSearch result={result} />;
                            }
                        })()
                    )}
                    {searchInput.length > 1 && result.length < 1 && <p className="text text-xl mt-20">No results ...</p>}
                </div>
            </div>
        </>
    )
}

export default SearchPage