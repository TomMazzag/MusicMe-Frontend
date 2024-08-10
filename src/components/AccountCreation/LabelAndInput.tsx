import { KeyboardEvent } from "react";

interface LabelAndInputProps {
    labelText: string
    valueState: string,
    onChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disableSpaces?: Boolean
    pattern?: string
}

const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
        event.preventDefault(); 
    }
}

export const LabelAndInput =({labelText, valueState, onChangeFunction, disableSpaces, pattern}: LabelAndInputProps) => {
    return (
        <div className="flex flex-col gap-4 self-center justify-between items-center md:flex-row md:w-[500px] md:gap-0">
            <label htmlFor="">{labelText}</label>
            <input 
                type="text" 
                value={valueState} 
                onChange={onChangeFunction}
                required
                className="input input-bordered"
                onKeyDown={disableSpaces ? handleKeyDown : (() => null)}
                pattern={pattern}
            />
        </div>
    )
}