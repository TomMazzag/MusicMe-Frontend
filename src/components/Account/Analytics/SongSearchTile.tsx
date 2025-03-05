interface ChartTitleProp {
    data: {
        imageUrl: string;
        value1: string;
        value2?: string;
        clickableUrl: string;
        trackId: string
    };
    onClickHandler: (trackId: string) => void;
}

export const SongSearchTile = ({ data, onClickHandler }: ChartTitleProp) => {
    return (
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onClickHandler(data.trackId)}>
            <img src={data.imageUrl} alt="" className="h-14 rounded" />
            <div className="text-start">
                <p>{data.value1}</p>
                <p className="opacity-60">{data.value2 || ''}</p>
            </div>
        </div>
    );
};
