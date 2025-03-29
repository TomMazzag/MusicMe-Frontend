export interface Genre {
    genre_key: PlatformGenres;
    genre_name: string;
    image?: string;
    short_description: string;
}

export type PlatformGenres = 'dnb' | 'house' | 'rnb' | 'dance' | 'country' | 'rock' | 'jazz' | 'electronic' | 'rap' | 'indie';