interface BasixTextProps {
    children: string;
    bold?: boolean;
}

export const HighlightText = ({ children, bold }: BasixTextProps) => {
    return <span className={`text-accent ${bold ? 'font-semibold' : ''}`}>{children}</span>;
};

export const Title = ({ children, bold }: BasixTextProps) => {
    return <h1 className={`text-2xl ${bold ? 'font-semibold' : ''}`}>{children}</h1>;
};
