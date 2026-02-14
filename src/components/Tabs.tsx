import { FileCode, FileType, X } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

export default function Tabs() {
    const location = useLocation();
    const currentPath = location.pathname;

    // Static list of "open" tabs for this portfolio demo
    // In a real app we might manage this state
    const tabs = [
        { path: '/', name: 'home.tsx', icon: FileCode, iconClass: 'text-[#e37933]' },
        { path: '/projects', name: 'projects.tsx', icon: FileCode, iconClass: 'text-[#4daaf2]' },
        { path: '/contact', name: 'contact.css', icon: FileType, iconClass: 'text-[#e5c07b]' },
    ];

    return (
        <div className="h-[35px] bg-[var(--vscode-tab-bg)] flex overflow-x-auto">
            {tabs.map((tab) => (
                <Link
                    key={tab.path}
                    to={tab.path}
                    className={cn(
                        "group flex items-center px-2.5 bg-[var(--vscode-tab-bg)] text-[var(--vscode-tab-fg)] border-r border-[var(--vscode-border)] cursor-pointer text-[13px] min-w-[120px] hover:bg-[var(--vscode-hover)]",
                        currentPath === tab.path && "bg-[var(--vscode-bg)] text-[var(--vscode-fg)] border-t border-[var(--vscode-status-bar-bg)]"
                    )}
                    style={{ textDecoration: 'none' }}
                >
                    <tab.icon className={cn("w-4 h-4 mr-1.5", tab.iconClass)} />
                    <span>{tab.name}</span>
                    <X className="ml-auto opacity-0 rounded-[3px] p-0.5 hover:bg-[#4e4e4e] group-hover:opacity-100" size={16} />
                </Link>
            ))}
        </div>
    );
}
