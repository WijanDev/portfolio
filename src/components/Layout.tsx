import { ReactNode, useState, useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';
import ActivityBar from '@/components/ActivityBar';
import Sidebar from '@/components/Sidebar';
import StatusBar from '@/components/StatusBar';
import Tabs from '@/components/Tabs';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
    const [isExplorerOpen, setIsExplorerOpen] = useState(true);
    const [isMobileExplorerOpen, setIsMobileExplorerOpen] = useState(false);
    const location = useLocation();
    const [lastVisitedPath, setLastVisitedPath] = useState('/');

    useEffect(() => {
        if (location.pathname !== '/debug') {
            setLastVisitedPath(location.pathname);
        }
    }, [location.pathname]);

    const toggleExplorer = () => {
        if (window.innerWidth <= 768) {
            setIsMobileExplorerOpen(!isMobileExplorerOpen);
        } else {
            setIsExplorerOpen(!isExplorerOpen);
        }
    };

    const handleSidebarItemClick = () => {
        if (window.innerWidth <= 768) {
            setIsMobileExplorerOpen(false);
        }
    };

    return (
        <div className="flex h-screen w-screen flex-col bg-[var(--vscode-bg)] text-[var(--vscode-fg)] overflow-hidden">
            <main className="flex flex-1 overflow-hidden relative">
                <ActivityBar
                    isExplorerOpen={isExplorerOpen}
                    setIsExplorerOpen={setIsExplorerOpen}
                    onToggleExplorer={toggleExplorer}
                    lastVisitedPath={lastVisitedPath}
                />

                <Sidebar
                    onItemClick={handleSidebarItemClick}
                    isDesktopOpen={isExplorerOpen}
                    isMobileOpen={isMobileExplorerOpen}
                    setMobileOpen={setIsMobileExplorerOpen}
                />

                <div className="flex flex-col flex-1 bg-[var(--vscode-bg)] h-full relative">
                    <Tabs />

                    <div className="p-10 overflow-y-auto h-full">
                        {children}
                    </div>
                </div>
            </main>

            <StatusBar />
        </div>
    );
}
