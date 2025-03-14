import { useEffect, useState } from 'react';
import { getAccountDetailsUsersAccount } from '../services/account';
import { getPlatformToken } from '../utils/tokenGen';
import { Helmet } from 'react-helmet-async';

export const Navbar = () => {
    const [profile_pic_url, setProfile_pic_url] = useState<string>('');

    const platform_token = getPlatformToken();
    useEffect(() => {
        getAccountDetailsUsersAccount(platform_token).then((profile) => {
            setProfile_pic_url(profile.userDetails.profile_picture_url);
        });
    }, []);

    return (
        <nav className="navbar bg-base-100 border-b-2 border-accent">
            <Helmet>
                <meta
                    name="description"
                    content="MusicMe: A social media platform for sharing music taste, discovering new tunes, and connecting with fellow music lovers. Join the beta today!"
                />
            </Helmet>
            <div className="flex-1">
                <a href="/account" className="btn btn-ghost text-4xl">
                    MusicMe
                </a>
            </div>
            <div className="mobile-menu md:hidden">
                <ul className="menu menu-horizontal rounded-box">
                    <li>
                        <a href="/feed">
                            <i className="fa-brands fa-discourse fa-xl"></i>
                        </a>
                    </li>
                    <li>
                        <a href="/search">
                            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                        </a>
                    </li>
                </ul>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={profile_pic_url} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-40"
                    >
                        <li>
                            <a href="/account">Profile</a>
                        </li>
                        <li>
                            <a href="/account/settings">Settings</a>
                        </li>
                        <li>
                            <a href="/">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex-none gap-2 hidden md:inline-flex">
                <div className="flex-1">
                    <a href="/feed" className="btn btn-ghost text-xl">
                        Feed
                    </a>
                </div>
                <div className="flex-1">
                    <a href="/discover" className="btn btn-ghost text-xl">
                        Discover
                    </a>
                </div>
                <div className="flex-1">
                    <a href="/search" className="btn btn-ghost text-xl">
                        Search
                    </a>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={profile_pic_url} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-40"
                    >
                        <li>
                            <a href="/account">Profile</a>
                        </li>
                        <li>
                            <a href="/account/settings">Settings</a>
                        </li>
                        <li>
                            <a href="/">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
