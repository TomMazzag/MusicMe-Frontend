import { Disc3, Drum, Guitar, House, LucideIcon, MicVocal, PartyPopper, Piano, Speaker, Zap } from 'lucide-react';

const BASE_STYLING = 'flex items-center gap-2 border rounded-lg p-1 px-2 w-[100px] text-sm text-bold cursor-pointer ';

interface BadgeProps {
    Icon: LucideIcon;
    text: string;
    color: `#${string}`;
}
const ProfileGenreBadge = ({ Icon, text, color }: BadgeProps) => (
    <div className={BASE_STYLING} style={{ borderColor: color, color }}>
        <Icon size={16} /> {text}
    </div>
);

export const ProfileBadges: Record<string, { component: JSX.Element }> = {
    dnb: {
        component: <ProfileGenreBadge Icon={Drum} text="DNB" color="#00cdb7" />,
    },
    house: {
        component: <ProfileGenreBadge Icon={House} text="House" color="#cdc701" />,
    },
    rnb: {
        component: <ProfileGenreBadge Icon={Disc3} text="R&B" color="#bd01cd" />,
    },
    dance: {
        component: <ProfileGenreBadge Icon={PartyPopper} text="Dance" color="#cd016c" />,
    },
    country: {
        component: <ProfileGenreBadge Icon={Guitar} text="Country" color="#e60505" />,
    },
    rock: {
        component: <ProfileGenreBadge Icon={Speaker} text="Rock" color="#016fcd" />,
    },
    jazz: {
        component: <ProfileGenreBadge Icon={Piano} text="Jazz" color="#cd7501" />,
    },
    electronic: {
        component: <ProfileGenreBadge Icon={Zap} text="Electronic" color="#08ff00" />,
    },
    rap: {
        component: <ProfileGenreBadge Icon={MicVocal} text="Rap" color="#5a5aa3" />,
    },
    indie: {
        component: <ProfileGenreBadge Icon={Guitar} text="Indie" color="#d46884" />,
    },
};
