import { Files, Search, GitBranch, Settings, UserCircle, BugPlay, MonitorDot } from 'lucide-react';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';

interface ActivityBarProps {
    isExplorerOpen: boolean;
    onToggleExplorer: () => void;
    setIsExplorerOpen: (isOpen: boolean) => void;
    lastVisitedPath: string;
}

export default function ActivityBar({ isExplorerOpen, onToggleExplorer, setIsExplorerOpen, lastVisitedPath }: Readonly<ActivityBarProps>) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleExplorerClick = () => {
        if (location.pathname === '/debug') {
            navigate({ to: lastVisitedPath });
            setIsExplorerOpen(true);
        } else {
            onToggleExplorer();
        }
    };

    return (
        <div className="activity-bar">
            <div className="activity-icons-top">
                <button
                    type="button"
                    className={`icon-container ${isExplorerOpen ? 'active' : ''}`}
                    onClick={handleExplorerClick}
                    aria-label="Explorer"
                    title="Explorer"
                >
                    <Files className="vscode-icon" />
                </button>
                <div className="icon-container" aria-hidden="true">
                    <Search className="vscode-icon" />
                </div>
                <div className="icon-container">
                    <a
                        href="https://github.com/WijanDev/portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        title="GitHub Profile"
                    >
                        <GitBranch className="vscode-icon" />
                    </a>
                </div>
                <Link
                    to="/debug"
                    className={`icon-container ${location.pathname === '/debug' && !isExplorerOpen ? 'active' : ''}`}
                    onClick={() => setIsExplorerOpen(false)}
                    aria-label="Debug"
                    title="Debug"
                >
                    <BugPlay className="vscode-icon" />
                </Link>
                <div className="icon-container" aria-hidden="true">
                    <MonitorDot className="vscode-icon" />
                </div>
            </div>

            <div className="activity-icons-bottom">
                <button
                    type="button"
                    className="icon-container"
                    aria-label="Accounts"
                    title="Accounts"
                >
                    <UserCircle className="vscode-icon" />
                </button>
                <button
                    type="button"
                    className="icon-container"
                    aria-label="Settings"
                    title="Settings"
                >
                    <Settings className="vscode-icon" />
                </button>
            </div>
        </div>
    );
}
