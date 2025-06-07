import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Profile } from 'src/types/Profile';

interface DecodedToken extends JwtPayload {
    userId: Profile.Public['user_id'];
}

export const getCurrentUserId = (platform_token: string) => {
    const decodedToken: DecodedToken = jwtDecode(platform_token!);
    const currentUserId = decodedToken.userId;
    return currentUserId;
};
