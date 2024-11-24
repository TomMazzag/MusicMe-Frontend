import { ClickableDiv } from "../../Util/ClickableDiv"

interface ChartTitleProp {
    data: {
        index: number
        imageUrl: string
        value1: string
        value2?: string
        clickableUrl: string
    }
}

export const ChartTile = ({data}: ChartTitleProp) => {
    return (
        <ClickableDiv url={data.clickableUrl}>
            <div className="flex items-center gap-4">
                <p>{data.index + 1}</p>
                <img src={data.imageUrl} alt="" className="h-14 rounded" />
                <div className="text-start">
                    <p>{data.value1}</p>
                    <p className="opacity-60">{data.value2 || ''}</p>
                </div>
            </div>
        </ClickableDiv>
    );
};
