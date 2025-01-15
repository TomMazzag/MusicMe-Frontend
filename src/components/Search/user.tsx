export const UserSearch = ({ result }: any) => {
    return (
        <>
            {result.map((user: any, index: number) => (
                <a href={`/user/${user.user_id}`} key={index}>
                    <div className="flex items-center gap-10 px-8 py-1">
                        <img src={user.profile_picture_url} alt="" className="rounded-[50%] w-32 h-32 object-cover" />
                        <div>
                            <h1 className="text text-2xl">{user.full_name}</h1>
                            <p className="text opacity-70">@{user.username}</p>
                        </div>
                    </div>
                </a>
            ))}
        </>
    );
};
