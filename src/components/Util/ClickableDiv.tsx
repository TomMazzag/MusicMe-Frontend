interface Props {
    url: string;
    children: any;
    openInNewTab?: boolean;
}

export const ClickableDiv = ({ url, children, openInNewTab = false }: Props) => {
    return (
        <a
            href={url}
            target={openInNewTab ? '_blank' : '_self'}
            rel="noopener noreferrer"
            style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                display: 'block',
            }}
        >
            {children}
        </a>
    );
};
