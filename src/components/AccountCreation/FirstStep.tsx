import { useEffect, useState } from "react"
import Switch from '@mui/material/Switch';
import { LabelAndInput } from "./LabelAndInput";


export const StepOne = ({spotifyAccountDetails, setActiveStep, updateAccountDetails}: any) => {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [public_playlists, setPublic_Playlists] = useState(true)
    const [validEmail, setValidEmail] = useState(false)

    useEffect(() => {
        if (spotifyAccountDetails) {
            setName(spotifyAccountDetails.display_name)
        }
    }, [spotifyAccountDetails])

    useEffect(() => {
        ValidateEmail()
    }, [email])

    function ValidateEmail() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }


    return (
        <div className="create-account-form">
            <div>
                <h2>Step one</h2>
                {spotifyAccountDetails && 
                <div className="first-page-options mt-10">
                    <LabelAndInput labelText="Full name" valueState={name} onChangeFunction={(e) => setName(e.target.value)}/>
                    <LabelAndInput labelText="Username" valueState={username} onChangeFunction={(e) => setUsername(e.target.value.toLowerCase())} disableSpaces={true} pattern="[a-z]*"/>
                    <LabelAndInput labelText="Email" valueState={email} onChangeFunction={(e) => setEmail(e.target.value.toLowerCase())} disableSpaces={true}/>
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
                    disabled={!(username.length > 3 && email.length > 3 && validEmail)}
                >Next</button>
            </div>
        </div>
    )
}