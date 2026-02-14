import { GitBranch, RefreshCw, AlertTriangle, XCircle, Bell } from 'lucide-react';

export default function StatusBar() {
    return (
        <div className="h-[22px] bg-[var(--vscode-status-bar-bg)] text-[var(--vscode-status-bar-fg)] flex items-center justify-between px-2.5 text-xs z-10 w-full overflow-hidden select-none">
            <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-1 cursor-pointer px-1 hover:bg-white/20 h-full">
                    <GitBranch size={14} />
                    <span>main</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer px-1 hover:bg-white/20">
                    <RefreshCw size={14} />
                </div>
                <div className="flex items-center gap-1 cursor-pointer px-1 hover:bg-white/20">
                    <XCircle size={14} />
                    <span>0</span>
                    <AlertTriangle size={14} className="ml-1" />
                    <span>0</span>
                </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
                <div className="hidden md:flex items-center gap-1 cursor-pointer px-1 hover:bg-white/20">
                    <span>Ln 12, Col 45</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 cursor-pointer px-1 hover:bg-white/20">
                    <span>UTF-8</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 cursor-pointer px-1 hover:bg-white/20">
                    <span>TypeScript React</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer px-1 hover:bg-white/20">
                    <Bell size={14} />
                </div>
            </div>
        </div>
    );
}
