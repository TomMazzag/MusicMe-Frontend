import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

const queryClient = new QueryClient();

if (typeof window !== 'undefined') {
    posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        loaded: (posthog) => {
            if (import.meta.env.MODE === 'development') posthog.debug(); // debug mode in development
        },
    });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <PostHogProvider client={posthog}>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </PostHogProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
