import { ReactNode, useState, useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';
import ActivityBar from '@/components/ActivityBar';
import Sidebar from '@/components/Sidebar';
import StatusBar from '@/components/StatusBar';
import Tabs from '@/components/Tabs';
import ThemeToggle from '@/components/ThemeToggle';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
    const [isExplorerOpen, setIsExplorerOpen] = useState(true);
    const location = useLocation();
    const [lastVisitedPath, setLastVisitedPath] = useState('/');

    useEffect(() => {
        if (location.pathname !== '/debug') {
            setLastVisitedPath(location.pathname);
        }
    }, [location.pathname]);

    const toggleExplorer = () => setIsExplorerOpen(!isExplorerOpen);

    const handleSidebarItemClick = () => {
        if (window.innerWidth <= 768) {
            setIsExplorerOpen(false);
        }
    };

    return (
        <div className="app-container">
            <main className="main-content">
                <ActivityBar
                    isExplorerOpen={isExplorerOpen}
                    setIsExplorerOpen={setIsExplorerOpen}
                    onToggleExplorer={toggleExplorer}
                    lastVisitedPath={lastVisitedPath}
                />
                {isExplorerOpen && <Sidebar onItemClick={handleSidebarItemClick} />}

                <div className="editor-container">
                    <ThemeToggle />
                    <Tabs />

                    <div className="editor-content">
                        {children}
                    </div>
                </div>
            </main>

            <StatusBar />
        </div>
    );
}
