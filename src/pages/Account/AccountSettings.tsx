import { Navbar } from '@MusicMe/components/navbar';
import { GeneralSettings } from '../../components/Account/GeneralSettings';
import { useQuery } from '@tanstack/react-query';
import { getAccountDetailsUsersAccount } from '../../services/account';
import { getPlatformToken } from '@MusicMe/utils';
import { useSearchParams } from 'react-router-dom';

type Tabs = 'general' | 'spotify';

export const AccountSettings = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab: Tabs | null = searchParams.get('tab') ? (searchParams.get('tab') as Tabs) : 'general';
    const platform_token = getPlatformToken();

    const {
        data: account,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ['account'],
        queryFn: async () => getAccountDetailsUsersAccount(platform_token),
    });

    const updateTab = (tabTitle: Tabs) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('tab', tabTitle);
        setSearchParams(newParams);
    };

    let pageContent;
    switch (tab) {
        case 'general':
            pageContent = <GeneralSettings account={account} isError={isError} isLoading={isLoading} />;
            break;
        case 'spotify':
            pageContent = <p>Spotify settings being added</p>;
            break;
        default:
            pageContent = <GeneralSettings account={account} isError={isError} isLoading={isLoading} />;
    }

    return (
        <>
            <Navbar />
            <div className="drawer md:drawer-open overflow-hidden">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center mt-8 sm:mt-0 sm:h-[90vh]">
                    {pageContent}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-300 text-base-content min-h-full w-56 p-4 text-lg">
                        <li>
                            <a className={tab === 'general' ? 'text-accent' : ''} onClick={() => updateTab('general')}>
                                General
                            </a>
                        </li>
                        <li>
                            <a className={tab === 'spotify' ? 'text-accent' : ''} onClick={() => updateTab('spotify')}>
                                Spotify Settings
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
