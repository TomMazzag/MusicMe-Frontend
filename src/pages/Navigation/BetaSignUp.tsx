export const BetaSignUp = () => {
    return (
        <div className="h-[100vh] flex justify-center align-middle items-center text-center">
            <div className="md:w-[400px]">
                <p>Sign up for the beta here</p>

                <form action="https://getlaunchlist.com/s/POQK9Z" method="POST" className="mt-10 flex flex-col gap-2">
                    <input name="name" type="text" className="input input-bordered w-full" placeholder="Full Name"></input>
                    <input name="email" type="email" className="input input-bordered w-full" placeholder="Email"></input>
                    <button type="submit" className="btn btn-primary mt-2">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};
