import { GitBranch, RefreshCw, AlertTriangle, XCircle, Bell } from 'lucide-react';

export default function StatusBar() {
    return (
        <div className="status-bar">
            <div className="status-left">
                <div className="status-item bg-[#007acc] px-2 h-full">
                    <GitBranch size={14} />
                    <span>main</span>
                </div>
                <div className="status-item">
                    <RefreshCw size={14} />
                </div>
                <div className="status-item">
                    <XCircle size={14} />
                    <span>0</span>
                    <AlertTriangle size={14} className="ml-1" />
                    <span>0</span>
                </div>
            </div>

            <div className="status-right">
                <div className="status-item">
                    <span>Ln 12, Col 45</span>
                </div>
                <div className="status-item">
                    <span>UTF-8</span>
                </div>
                <div className="status-item">
                    <span>TypeScript React</span>
                </div>
                <div className="status-item">
                    <Bell size={14} />
                </div>
            </div>
        </div>
    );
}
