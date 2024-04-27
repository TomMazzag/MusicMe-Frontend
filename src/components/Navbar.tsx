import { useEffect, useState } from "react";
import { getAccountDetailsUsersAccount } from "../services/account";

export const Navbar = () => {
    const [profile_pic_url, setProfile_pic_url] = useState<string>("")

    const token = localStorage.getItem("platform_token")
    useEffect(() => {
        getAccountDetailsUsersAccount(token!)
        .then((profile) => {
            //console.log(profile)
            setProfile_pic_url(profile.userDetails.profile_picture_url)
        })
    }, [])

    return (
        <nav className="navbar bg-base-100 border-b-2 border-accent">
            <div className="flex-1">
                <a href="/account" className="btn btn-ghost text-4xl">MusicMe</a>
            </div>
            <div className="flex-none gap-2 hidden md:inline-flex">
                <div className="flex-1">
                    <a href="/feed" className="btn btn-ghost text-xl">Feed</a>
                </div>
                <div className="flex-1">
                    <a href="/discover" className="btn btn-ghost text-xl">Discover</a>
                </div>
                <div className="flex-1">
                    <a href="/search" className="btn btn-ghost text-xl">Search</a>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={profile_pic_url} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40">
                        <li><a href="/account">Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a href="/">Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};
