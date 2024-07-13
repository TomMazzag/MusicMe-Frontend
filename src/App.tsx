import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Welcome } from './pages/Navigation/Landing';
import { Success } from './pages/Navigation/Success';
import { UsersAccount } from './pages/Account/UsersAccount';
import { CreateAccount } from './pages/Navigation/CreateAccount';
import SearchPage from './pages/Search/Search';
import { ErrorPage } from './pages/Error/CatchAll';
import { ComingSoon } from './pages/Error/ComingSoon';
import { PublicAccount } from './pages/Account/PublicAccount';
import { TrackPage } from './pages/SearchResults/Track';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/account",
    element: <UsersAccount />,
  },
  {
    path: "/account/create",
    element: <CreateAccount />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
  {
    path: "/feed",
    element: <ComingSoon />,
  },
  {
    path: "/discover",
    element: <ComingSoon />,
  },
  {
    path: "/user/:user_id",
    element: <PublicAccount />,
  },
  {
    path: "/songs/:songId",
    element: <TrackPage />,
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
