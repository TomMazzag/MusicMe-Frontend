export const Navbar = () => {
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
                            <img alt="Tailwind CSS Navbar component" src="https://i.scdn.co/image/ab6775700000ee85cb8d37bd4f069784749ea07a" />
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
