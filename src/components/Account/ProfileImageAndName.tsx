interface Props {
    profileImageUrl: string;
    fullName: string;
    username: string;
}

export const ProfimeImageAndName = ({profileImageUrl, fullName, username}: Props) => {
    return (
        <div className="flex items-center gap-2 mb-2 lg:mb-4">
            <img src={profileImageUrl} alt="Users profile picture" className="rounded-full h-12 w-12 lg:h-16 lg:w-16" />
            <div className="flex flex-col">
                <h2 className="font-bold">{fullName}</h2>
                <h3 className="opacity-70 text-sm">@{username}</h3>
            </div>
        </div>
    );
};
