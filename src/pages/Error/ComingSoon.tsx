import { Navbar } from '../../components/Navbar';

export const ComingSoon = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col text-center justify-center h-screen">
                <h1 className="text-5xl mb-28 font-semibold">This page is coming soon</h1>
                <p className="text-xl">Go back to homepage or checkout some of the other pages on the navbar</p>
            </div>
        </>
    );
};
