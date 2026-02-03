import { FileCode, FileType, X } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';

export default function Tabs() {
    const location = useLocation();
    const currentPath = location.pathname;

    // Static list of "open" tabs for this portfolio demo
    // In a real app we might manage this state
    const tabs = [
        { path: '/', name: 'home.tsx', icon: FileCode, iconClass: 'icon-html' },
        { path: '/projects', name: 'projects.tsx', icon: FileCode, iconClass: 'icon-react' },
        { path: '/contact', name: 'contact.css', icon: FileType, iconClass: 'icon-css' },
    ];

    return (
        <div className="tabs-container">
            {tabs.map((tab) => (
                <Link
                    key={tab.path}
                    to={tab.path}
                    className={`tab ${currentPath === tab.path ? 'active' : ''}`}
                    style={{ textDecoration: 'none' }}
                >
                    <tab.icon className={`tab-icon ${tab.iconClass}`} />
                    <span>{tab.name}</span>
                    <X className="tab-close" size={14} />
                </Link>
            ))}
        </div>
    );
}
