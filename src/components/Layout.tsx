import { ReactNode, useState } from 'react';
import ActivityBar from './ActivityBar';
import Sidebar from './Sidebar';
import StatusBar from './StatusBar';
import Tabs from './Tabs';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [isExplorerOpen, setIsExplorerOpen] = useState(true);

    const toggleExplorer = () => setIsExplorerOpen(!isExplorerOpen);

    return (
        <div className="app-container">
            <div className="main-content">
                <ActivityBar
                    isExplorerOpen={isExplorerOpen}
                    setIsExplorerOpen={setIsExplorerOpen}
                    onToggleExplorer={toggleExplorer}
                />
                {isExplorerOpen && <Sidebar />}

                <div className="editor-container">
                    <Tabs />

                    <div className="editor-content">
                        {children}
                    </div>
                </div>
            </div>

            <StatusBar />
        </div>
    );
}
