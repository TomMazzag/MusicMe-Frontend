import { Navbar } from '../../components/Navbar';

export const ErrorPage = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col text-center justify-center h-screen">
                <h1 className="text-4xl mb-20 font-semibold">ERROR page not found</h1>
                <p>
                    Go back to the <a href="/account">homepage</a>
                </p>
            </div>
        </>
    );
};
