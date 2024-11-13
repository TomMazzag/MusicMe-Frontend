import {Helmet} from "react-helmet-async";

interface MetaWrapperProps {
    title: string;
    description?: string
}

export const MetaWrapper = ({title, description}: MetaWrapperProps) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}></meta>
        </Helmet>
    );
};
