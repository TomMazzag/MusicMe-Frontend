import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const navigate = useNavigate()

    const authorize = async () => {
        try {
            const generateRandomString = (length: number) => {
                const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const values = crypto.getRandomValues(new Uint8Array(length));
                return values.reduce((acc, x) => acc + possible[x % possible.length], '');
            };
            const codeVerifier = generateRandomString(64);

            const sha256 = async (plain: string) => {
                const encoder = new TextEncoder();
                const data = encoder.encode(plain);
                return window.crypto.subtle.digest('SHA-256', data);
            };

            const base64encode = (input: any) => {
                return btoa(String.fromCharCode(...new Uint8Array(input)))
                    .replace(/=/g, '')
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_');
            };

            const hashed = await sha256(codeVerifier);
            const codeChallenge = base64encode(hashed);

            const redirectUri = import.meta.env.VITE_REDIRECT_URI;

            const scope =
                'user-read-private user-read-email playlist-read-collaborative playlist-read-private user-top-read';
            const authUrl = new URL('https://accounts.spotify.com/authorize');

            console.log('VERIFIER: ' + codeVerifier);
            window.localStorage.setItem('code_verifier', codeVerifier);

            const params = {
                response_type: 'code',
                client_id: clientId,
                scope,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge,
                redirect_uri: redirectUri,
            };

            authUrl.search = new URLSearchParams(params).toString();
            console.log(authUrl);
            window.location.href = authUrl.toString();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col justify-evenly items-center h-screen">
            <div className="text-center mt-10">
                <h1 className="text-6xl font-bold mb-4">MusicMe</h1>
                <p className="text-xl italic">Social media for music</p>
            </div>

            <div className="flex flex-col gap-6 text-center">
                {clientId ? (
                    <button className="btn btn-outline btn-primary" onClick={authorize} onTouchStart={authorize}>
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
                <div className='w-[100%] mt-8'>
                    <p className='pb-2 opacity-75'>Dont have an account? <br></br> Sign up for the beta below!</p>
                    <button className="btn btn-outline w-full" onClick={() => {navigate('/register')}}>
                        Sign up for the beta
                    </button>
                </div>
            </div>
        </div>
    );
};
