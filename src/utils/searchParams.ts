import { SetURLSearchParams } from 'react-router-dom';

export const updateSearchParams = <P extends string>(
    parameterKey: string,
    parameterValue: P,
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams,
) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(parameterKey, parameterValue);
    setSearchParams(newParams);
};
