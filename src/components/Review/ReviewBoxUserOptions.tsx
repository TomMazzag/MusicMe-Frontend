export const ReviewBoxUserOptions = ({}) => {
    return (
        <div className="dropdown dropdown-end absolute top-[-3px] right-[10px] h-0 z-50">
            <div tabIndex={0} role="button" className="btn m-1 rounded-full h-0">
                <i className="fa-solid fa-ellipsis"></i>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-22 p-2 shadow">
                <button className="btn btn-sm">Edit</button>
                <button className="btn btn-sm">Delete</button>
            </ul>
        </div>
    );
};
