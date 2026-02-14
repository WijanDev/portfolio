import { Files, Search, GitBranch, Settings, UserCircle, BugPlay, MonitorDot } from 'lucide-react';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';

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
            setIsExplorerOpen(true); // This might need update if we want to open mobile drawer too?
            // Actually, if we are in debug and go back, we probably want to restore state.
            // For now, let's trust onToggleExplorer will handle the main toggle action.
        }
        onToggleExplorer();
    };

    const iconBaseClass = "cursor-pointer opacity-60 relative flex justify-center items-center p-1.5 bg-transparent border-0 hover:opacity-100 text-[var(--vscode-activity-bar-fg)]"
    const activeClass = "opacity-100 border-l-2 border-[var(--vscode-activity-bar-fg)]" // Icons are white in dark mode, but in light mode they should be activity-bar-fg
    const iconSize = 24

    // In VS Code, active icons are white (or distinct light color) in Dark mode, 
    // and dark in Light mode. Our variables handle --vscode-activity-bar-fg which switches.

    return (
        <div className="w-[50px] bg-[var(--vscode-activity-bar-bg)] text-[var(--vscode-activity-bar-fg)] flex flex-col justify-between py-2 border-r border-[var(--vscode-border)] shrink-0">
            <div className="flex flex-col items-center gap-4">
                <button
                    type="button"
                    className={cn(iconBaseClass, isExplorerOpen && activeClass)}
                    onClick={handleExplorerClick}
                    aria-label="Explorer"
                    title="Explorer"
                >
                    <Files size={iconSize} />
                </button>
                <div className={cn(iconBaseClass)} aria-hidden="true">
                    <Search size={iconSize} />
                </div>
                <div className={cn(iconBaseClass)}>
                    <a
                        href="https://github.com/WijanDev/portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        title="GitHub Profile"
                        className="text-[var(--vscode-activity-bar-fg)] flex items-center justify-center"
                    >
                        <GitBranch size={iconSize} />
                    </a>
                </div>
                <Link
                    to="/debug"
                    className={cn(iconBaseClass, location.pathname === '/debug' && !isExplorerOpen && activeClass)}
                    onClick={() => setIsExplorerOpen(false)}
                    aria-label="Debug"
                    title="Debug"
                >
                    <BugPlay size={iconSize} />
                </Link>
                <div className={cn(iconBaseClass)} aria-hidden="true">
                    <MonitorDot size={iconSize} />
                </div>
            </div>

            <div className="flex flex-col items-center gap-4">
                <ThemeToggle
                    className={cn(iconBaseClass, "opacity-100 hover:opacity-100")} // Theme toggle should be always visible/distinct? Or follow standard opacity rules? 
                    // Actually, let's keep it consistent.
                    iconClassName="text-[var(--vscode-activity-bar-fg)]"
                    size={iconSize}
                />
                <button
                    type="button"
                    className={cn(iconBaseClass)}
                    aria-label="Accounts"
                    title="Accounts"
                >
                    <UserCircle size={iconSize} />
                </button>
                <button
                    type="button"
                    className={cn(iconBaseClass)}
                    aria-label="Settings"
                    title="Settings"
                >
                    <Settings size={iconSize} />
                </button>
            </div>
        </div>
    );
}
