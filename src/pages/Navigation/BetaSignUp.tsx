import { HighlightText } from '../../components/Util/TextComponents';

export const BetaSignUp = () => {
    return (
        <div className="h-[100vh] flex justify-center align-middle items-center text-center">
            <div className="md:w-[400px]">
                <div className="text-center mb-20 md:mb-10">
                    <a href="/">
                        <h1 className="text-6xl font-bold mb-4">MusicMe</h1>
                    </a>
                    <p className="text-xl italic">Social media for music</p>
                </div>

                <HighlightText bold={true}>Sign up for the beta here</HighlightText>

                <form action="https://getlaunchlist.com/s/POQK9Z" method="POST" className="mt-10 flex flex-col gap-2">
                    <input
                        name="name"
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Full Name"
                    ></input>
                    <input
                        name="email"
                        type="email"
                        className="input input-bordered w-full"
                        placeholder="Email"
                    ></input>
                    <button type="submit" className="btn btn-primary mt-2">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};
