import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Welcome } from './pages/Navigation/Landing';
import { Success } from './pages/Navigation/Success';
import { UsersAccount } from './pages/Account/UsersAccount';
import { CreateAccount } from './pages/Navigation/CreateAccount';
import SearchPage from './pages/Search/Search';

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
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App