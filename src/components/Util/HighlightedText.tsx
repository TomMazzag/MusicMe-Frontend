export const HighlightText = ({ children, bold }: { children: string, bold?: boolean }) => {
    return <span className={`text-accent ${bold ? 'font-semibold' : ''}`}>{children}</span>;
};
