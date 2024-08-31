import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { GeneralSettings } from "../../components/Account/GeneralSettings";
import { useQuery } from "@tanstack/react-query";
import { getAccountDetailsUsersAccount } from "../../services/account";

export const AccountSettings = () => {
    const [page, setPage] = useState('')
    const platform_token = localStorage.getItem('platform_token')

    const {
        data: account,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['account'],
        queryFn: async () => getAccountDetailsUsersAccount(platform_token!)
    })

    let pageContent;
    switch(page) {
        case 'general':
            pageContent = <GeneralSettings account={account} isError={isError} isLoading={isLoading}/>
            break
        case "spotify":
            pageContent = <p>Spotify settings being added</p>;
            break
        default:
            pageContent = <GeneralSettings account={account} isError={isError} isLoading={isLoading}/>
    }

    return (
        <>
            <Navbar />
            <div className="drawer md:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center mt-8 sm:mt-0 sm:h-[100vh]">
                    {pageContent}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-300 text-base-content min-h-full w-56 p-4">
                        <li><a onClick={() => setPage('general')}>General</a></li>
                        <li><a onClick={() => setPage('spotify')}>Spotify Settings</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
};
