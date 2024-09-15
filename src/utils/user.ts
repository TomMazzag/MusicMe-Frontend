import { JwtPayload, jwtDecode } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
    userId: number;
}

export const getCurrentUserId = (platform_token: string) => {
    const decodedToken: DecodedToken = jwtDecode(platform_token!);
    const currentUserId = decodedToken.userId;
    return currentUserId;
};
