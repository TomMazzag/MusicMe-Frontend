import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import platformImage from '../../assets/platform.webp';
const backend_url = import.meta.env.VITE_BACKEND_URL;

export const Welcome = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const navigate = useNavigate();

    const authorize = async () => {
        try {
            window.location.href = `${backend_url}/auth/login`;
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="h-screen">
            <Helmet>
                <meta
                    name="description"
                    content="MusicMe: A social media platform for sharing music taste, discovering new tunes, and connecting with fellow music lovers. Join the beta today!"
                />
            </Helmet>
            <div className="flex md:grid md:grid-cols-2 h-full overflow-hidden justify-center">
                <div className="flex flex-col justify-evenly items-center">
                    <div className="text-center mt-10">
                        <h1 className="text-6xl font-bold mb-4">MusicMe</h1>
                        <p className="text-xl italic">Social media for music</p>
                    </div>

                    <div className="flex flex-col gap-6 text-center">
                        {clientId ? (
                            <button
                                className="btn btn-outline btn-primary"
                                onClick={authorize}
                                onTouchStart={authorize}
                            >
                                Click here to begin
                            </button>
                        ) : (
                            <>
                                <p className="text-center text-red-500">Missing client ID</p>
                                <button className="btn btn-outline btn-primary" onClick={authorize} disabled>
                                    Click here to begin
                                </button>
                            </>
                        )}
                        <div className="w-[100%] mt-8">
                            <p className="pb-2 opacity-75">
                                Dont have an account? <br></br> Sign up for the beta below!
                            </p>
                            <button
                                className="btn btn-outline w-full"
                                onClick={() => {
                                    navigate('/register');
                                }}
                            >
                                Sign up for the beta
                            </button>
                        </div>
                    </div>
                    <a href="/about" className="text-accent">
                        About
                    </a>
                </div>
                <img
                    className="h-full border-l-4 border-accent object-cover object-left hidden md:block"
                    src={platformImage}
                    alt="Platform image"
                />
            </div>
        </div>
    );
};
