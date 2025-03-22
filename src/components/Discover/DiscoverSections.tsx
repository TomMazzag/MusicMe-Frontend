import { Title } from '../Util/TextComponents';

interface DiscoverSectionProps {
    sectionTitle: string;
    children: JSX.Element
}

export const DiscoverSection = ({ sectionTitle, children }: DiscoverSectionProps) => {
    return (
        <section className="flex flex-col gap-6 pb-10 border-b last:border-0 border-accent">
            <Title>{sectionTitle}</Title>
            {children}
        </section>
    );
};
