import { ArrowDown, ArrowUp, Dot } from 'lucide-react';

export const ProgressionArrowUp = () => {
    return (
        <div className='border px-2 rounded-lg border-green-400' title='Song moved up ranking'>
            <ArrowUp size={15}/>
        </div>
    );
};

export const ProgressionArrowDown = () => {
    return (
        <div className="border px-2 rounded-lg border-red-500" title="Song moved down ranking">
            <ArrowDown size={15} />
        </div>
    );
};

export const ProgressionSameSpot = () => {
    return (
        <div className="border px-2 rounded-lg border-gray-500" title="Same spot as yesterday">
            <Dot size={15} />
        </div>
    );
};
