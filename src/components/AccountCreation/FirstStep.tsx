import { KeyboardEvent, useEffect, useState } from "react"
import Switch from '@mui/material/Switch';


export const StepOne = ({spotifyAccountDetails, setActiveStep, updateAccountDetails}: any) => {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [public_playlists, setPublic_Playlists] = useState(true)

    useEffect(() => {
        if (spotifyAccountDetails) {
            setName(spotifyAccountDetails.display_name)
        }
    }, [spotifyAccountDetails])

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 32) {
            event.preventDefault(); 
        }
    }

    // function ValidateEmail(email: string) {
    //     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    //         return (true)
    //     }
    //     return (false)
    // }


    return (
        <div className="create-account-form">
            <div>
                <h2>Step one</h2>
                {spotifyAccountDetails && 
                <div className="first-page-options mt-10">
                    <div className="flex flex-col gap-4 self-center justify-between items-center md:flex-row md:w-[500px] md:gap-0">
                        <label htmlFor="">Full Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => {setName(e.target.value)}}
                            required
                            className="input input-bordered"
                        />
                    </div>
                    <div className="flex flex-col gap-4 self-center justify-between items-center md:flex-row md:w-[500px] md:gap-0">
                        <label htmlFor="">Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value.toLowerCase())} 
                            onKeyDown={handleKeyDown}
                            pattern="[a-z]*"
                            required
                            className="input input-bordered"
                        />
                    </div>
                    <div className="flex flex-col gap-4 self-center justify-between items-center md:flex-row md:w-[500px] md:gap-0">
                        <label htmlFor="">Email</label>
                        <input 
                            type="text" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value.toLowerCase())} 
                            onKeyDown={handleKeyDown}
                            required
                            className="input input-bordered"
                        />
                    </div>
                    <div className="flex flex-col gap-4 self-center justify-between items-center md:flex-row md:w-[500px] md:gap-0">
                        <label htmlFor="">Show public playlists on proifle</label>
                        
                        <Switch checked={public_playlists} onChange={() => {setPublic_Playlists(!public_playlists)}}/>
                    </div>
                </div>
                }
            </div>
            <div className="flex justify-between mx-[10%] mt-[50px] md:mx-[30%]">
                <button disabled={true} className="btn">Previous</button>
                <button 
                    className="btn"
                    onClick={() => {updateAccountDetails({name, email, username, public_playlists}); setActiveStep(1)}}
                    disabled={!(username.length > 3 && email.length > 3)}
                >Next</button>
            </div>
        </div>
    )
}