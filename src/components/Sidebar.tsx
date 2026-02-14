import { ChevronDown, ChevronRight, FileCode, FileJson, FileType, Folder } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    Drawer,
    DrawerContent,
    DrawerTitle,
    DrawerDescription,
    DrawerHeader
} from '@/components/ui/drawer';

interface SidebarProps {
    onItemClick?: () => void;
}

function SidebarContent({ onItemClick }: Readonly<SidebarProps>) {
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
        <div className="flex flex-col h-full w-full">
            <div className="h-[35px] flex items-center pl-4 text-[11px] font-bold tracking-[0.5px] uppercase text-[var(--vscode-fg)] shrink-0 opacity-60">
                EXPLORER
            </div>

            <div className="flex-1 overflow-auto">
                <button
                    type="button"
                    className="flex items-center px-2 py-1 cursor-pointer font-bold w-full text-left hover:bg-[var(--vscode-hover)] text-[var(--vscode-fg)]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <span className="ml-1 text-[11px]">PORTFOLIO</span>
                </button>

                {isOpen && (
                    <div className="flex flex-col">
                        <button
                            type="button"
                            className="flex items-center px-4 py-[3px] cursor-pointer w-full text-left hover:bg-[var(--vscode-hover)] text-[var(--vscode-fg)]"
                            onClick={() => setIsSrcOpen(!isSrcOpen)}
                        >
                            {isSrcOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            <Folder size={16} className="ml-0 mr-1 text-[#dcb67a]" />
                            <span className="text-[13px]">src</span>
                        </button>

                        {isSrcOpen && (
                            <>
                                <Link
                                    to="/"
                                    className={cn(
                                        "flex items-center py-[3px] pl-7 cursor-pointer text-[13px] text-[var(--vscode-fg)] hover:bg-[var(--vscode-hover)] decoration-0",
                                        isActive('/') && "bg-[var(--vscode-selection)] text-[var(--vscode-fg)]"
                                    )}
                                    onClick={handleItemClick}
                                >
                                    <FileCode size={16} className="mr-1.5 text-[#e37933]" />
                                    <span>readme.md</span>
                                </Link>

                                <Link
                                    to="/projects"
                                    className={cn(
                                        "flex items-center py-[3px] pl-7 cursor-pointer text-[13px] text-[var(--vscode-fg)] hover:bg-[var(--vscode-hover)] decoration-0",
                                        isActive('/projects') && "bg-[var(--vscode-selection)] text-[var(--vscode-fg)]"
                                    )}
                                    onClick={handleItemClick}
                                >
                                    <FileCode size={16} className="mr-1.5 text-[#4daaf2]" />
                                    <span>projects.tsx</span>
                                </Link>

                                <Link
                                    to="/contact"
                                    className={cn(
                                        "flex items-center py-[3px] pl-7 cursor-pointer text-[13px] text-[var(--vscode-fg)] hover:bg-[var(--vscode-hover)] decoration-0",
                                        isActive('/contact') && "bg-[var(--vscode-selection)] text-[var(--vscode-fg)]"
                                    )}
                                    onClick={handleItemClick}
                                >
                                    <FileType size={16} className="mr-1.5 text-[#e5c07b]" />
                                    <span>contact.css</span>
                                </Link>
                            </>
                        )}

                        <Link
                            to="/package"
                            className={cn(
                                "flex items-center py-[3px] pl-7 cursor-pointer text-[13px] text-[var(--vscode-fg)] hover:bg-[var(--vscode-hover)] decoration-0",
                                isActive('/package') && "bg-[var(--vscode-selection)] text-[var(--vscode-fg)]"
                            )}
                            onClick={handleItemClick}
                        >
                            <FileJson size={16} className="mr-1.5 text-[#cbcb41]" />
                            <span>package.json</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Sidebar({ onItemClick, isDesktopOpen, isMobileOpen, setMobileOpen }: Readonly<SidebarProps & { isDesktopOpen: boolean, isMobileOpen: boolean, setMobileOpen: (open: boolean) => void }>) {
    return (
        <>
            {/* Mobile Drawer - Controlled by props */}
            <Drawer open={isMobileOpen} onOpenChange={setMobileOpen}>
                <DrawerContent className="bg-[var(--vscode-sidebar-bg)] border-t border-[var(--vscode-border)] focus:outline-none">
                    <DrawerHeader className="hidden">
                        <DrawerTitle>Navigation</DrawerTitle>
                        <DrawerDescription>Navigate through the portfolio using the sidebar.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 flex-1 h-[60vh] text-[var(--vscode-fg)]">
                        <SidebarContent onItemClick={() => {
                            setMobileOpen(false);
                            if (onItemClick) onItemClick();
                        }} />
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Desktop Sidebar */}
            <div className={cn(
                "hidden md:flex w-64 bg-[var(--vscode-sidebar-bg)] text-[var(--vscode-fg)] flex-col border-r border-[var(--vscode-border)] select-none h-full transition-all duration-300",
                !isDesktopOpen && "hidden md:hidden"
            )}>
                {isDesktopOpen && <SidebarContent onItemClick={onItemClick} />}
            </div>
        </>
    );
}
