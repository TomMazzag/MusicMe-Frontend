interface TablistProps {
    activeTab: string;
    setActiveTab: Function;
    tabContent: JSX.Element;
}

export const Tablist = ({activeTab, setActiveTab, tabContent}: TablistProps) => {
    return (
        <>
            <div role="tablist" className="tabs tabs-boxed mb-2 md:mb-10">
                <a
                    role="tab"
                    className={`tab ${activeTab === 'Playlists' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('Playlists')}
                >
                    Playlists
                </a>
                <a
                    role="tab"
                    className={`tab ${activeTab === 'Liked' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('Liked')}
                >
                    Liked songs
                </a>
                <a
                    role="tab"
                    className={`tab ${activeTab === 'Analytics' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('Analytics')}
                >
                    Stats
                </a>
            </div>

            <div>{tabContent}</div>
        </>
    );
};
