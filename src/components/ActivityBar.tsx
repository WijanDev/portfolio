import { Files, Search, GitBranch, Settings, UserCircle, BugPlay, MonitorDot } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';

interface ActivityBarProps {
    isExplorerOpen: boolean;
    onToggleExplorer: () => void;
    setIsExplorerOpen: (isOpen: boolean) => void;
}

export default function ActivityBar({ isExplorerOpen, onToggleExplorer, setIsExplorerOpen }: Readonly<ActivityBarProps>) {
    const location = useLocation();
    return (
        <div className="activity-bar">
            <div className="activity-icons-top">
                <button
                    type="button"
                    className={`icon-container ${isExplorerOpen ? 'active' : ''}`}
                    onClick={onToggleExplorer}
                >
                    <Files className="vscode-icon" />
                </button>
                <div className="icon-container">
                    <Search className="vscode-icon" />
                </div>
                <div className="icon-container">
                    <a href="https://github.com/WijanDev/portfolio" target="_blank" rel="noopener noreferrer">
                        <GitBranch className="vscode-icon" />
                    </a>
                </div>
                <button
                    type="button"
                    className={`icon-container ${location.pathname === '/debug' && !isExplorerOpen ? 'active' : ''}`}
                    onClick={() => setIsExplorerOpen(false)}
                >
                    <Link to="/debug">
                        <BugPlay className="vscode-icon" />
                    </Link>
                </button>
                <div className="icon-container">
                    <MonitorDot className="vscode-icon" />
                </div>
            </div>

            <div className="activity-icons-bottom">
                <button
                    type="button"
                    className="icon-container"
                >
                    <UserCircle className="vscode-icon" />
                </button>
                <button
                    type="button"
                    className="icon-container"
                >
                    <Settings className="vscode-icon" />
                </button>
            </div>
        </div>
    );
}
