import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateToken, login } from '../../services/auth';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { useMutation } from '@tanstack/react-query';

export const Success = () => {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code')!;
    let state = urlParams.get('state')!;
    const tokenFetched = useRef(false)

    const {
        mutate: fetchTokens,
        error: tokenError,
    } = useMutation({
        mutationFn: () => generateToken(code, state),
        onSuccess: (data) => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            loginMutation.mutate(data.access_token);
        },
    });

    const loginMutation = useMutation({
        mutationFn: (accessToken: string) => login(accessToken),
        onSuccess: (data) => {
            if (data.error) {
                navigate('/account/create');
            } else {
                localStorage.setItem('platform_token', data);
                navigate('/account');
            }
        },
        onError: () => {
            console.error('Login failed:', tokenError);
        },
    });

    useEffect(() => {
        if (!tokenFetched.current) {
            fetchTokens();
            
            return () => {
                tokenFetched.current = true
            }
        }
    }, [fetchTokens]);

    return (
        <div className="success-redirect flex flex-col justify-center items-center h-screen text-center gap-12">
            <h1>Welcome to social media for music!</h1>

            <p>Loading...</p>

            <PropagateLoader color="lightgreen" style={{ display: 'inherit', position: 'relative', left: '-7px' }} />
        </div>
    );
};
