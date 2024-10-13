import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Welcome } from './pages/Navigation/Landing';
import { Success } from './pages/Navigation/Success';
import { UsersAccount } from './pages/Account/UsersAccount';
import { CreateAccount } from './pages/Navigation/CreateAccount';
import SearchPage from './pages/Search/Search';
import { ErrorPage } from './pages/Error/CatchAll';
import { ComingSoon } from './pages/Error/ComingSoon';
import { PublicAccount } from './pages/Account/PublicAccount';
import { TrackPage } from './pages/SearchResults/Track';
import { Connections } from './pages/Account/Connections';
import { AccountSettings } from './pages/Account/AccountSettings';
import { BetaSignUp } from './pages/Navigation/BetaSignUp';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Welcome />,
    },
    {
        path: '/success',
        element: <Success />,
    },
    {
        path: '/account',
        children: [
            {
                index: true,
                element: <UsersAccount />,
            },
            {
                path: 'create',
                element: <CreateAccount />,
            },
            {
                path: 'settings',
                element: <AccountSettings />,
            },
        ],
    },
    {
        path: '/search',
        element: <SearchPage />,
    },
    {
        path: '/*',
        element: <ErrorPage />,
    },
    {
        path: '/feed',
        element: <ComingSoon />,
    },
    {
        path: '/discover',
        element: <ComingSoon />,
    },
    {
        path: '/user/:user_id',
        children: [
            {
                index: true,
                element: <PublicAccount />,
            },
            {
                path: 'following',
                element: <Connections ConnectionType="following" />,
            },
            {
                path: 'followers',
                element: <Connections ConnectionType="followers" />,
            },
        ],
    },
    {
        path: '/songs/:songId',
        element: <TrackPage />,
    },
    {
        path: '/register',
        element: <BetaSignUp />
    }
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
