export interface Artist {
    name: string;
}

export interface Album {
    images: { url: string }[];
}

export interface Song {
    name: string;
    artists: Artist[];
    album: Album;
    likes: number;
    userHasLiked: boolean;
    spotifyData?: Record<string, any>; // Optional additional data from Spotify
}
