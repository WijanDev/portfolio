import { ChevronDown, ChevronRight, FileCode, FileJson, FileType, Folder } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';

interface SidebarProps {
    onItemClick?: () => void;
}

export default function Sidebar({ onItemClick }: Readonly<SidebarProps>) {
    const [isOpen, setIsOpen] = useState(true);
    const [isSrcOpen, setIsSrcOpen] = useState(true);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const handleItemClick = () => {
        if (onItemClick) {
            onItemClick();
        }
    };

    return (
        <div className="sidebar">
            <div className="sidebar-title">
                EXPLORER
            </div>

            <div>
                <button
                    type="button"
                    className="sidebar-section"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <span>PORTFOLIO</span>
                </button>

                {isOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button
                            type="button"
                            className="folder-item"
                            onClick={() => setIsSrcOpen(!isSrcOpen)}
                        >
                            {isSrcOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            <Folder size={16} style={{ color: '#dcb67a', margin: '0 4px' }} />
                            <span>src</span>
                        </button>

                        {isSrcOpen && (
                            <>
                                <Link
                                    to="/"
                                    className={`file-item ${isActive('/') ? 'active' : ''}`}
                                    onClick={handleItemClick}
                                >
                                    <FileCode size={16} className="icon-html" />
                                    <span>readme.md</span>
                                </Link>

                                <Link
                                    to="/projects"
                                    className={`file-item ${isActive('/projects') ? 'active' : ''}`}
                                    onClick={handleItemClick}
                                >
                                    <FileCode size={16} className="icon-react" />
                                    <span>projects.tsx</span>
                                </Link>

                                <Link
                                    to="/contact"
                                    className={`file-item ${isActive('/contact') ? 'active' : ''}`}
                                    onClick={handleItemClick}
                                >
                                    <FileType size={16} className="icon-css" />
                                    <span>contact.css</span>
                                </Link>
                            </>
                        )}

                        <Link
                            to="/package"
                            className={`file-item ${isActive('/package') ? 'active' : ''}`}
                            onClick={handleItemClick}
                        >
                            <FileJson size={16} className="icon-json" />
                            <span>package.json</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
