
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ActivityBar from '@/components/ActivityBar'

// Mock icons to avoid rendering large SVGs if not necessary (optional, but keep it simple for now)
// Mock router
vi.mock('@tanstack/react-router', () => ({
    useLocation: vi.fn(),
    useNavigate: vi.fn(() => vi.fn()),
    Link: ({ children, className, onClick, ...props }: any) => <a href="#" className={className} onClick={(e) => { if (onClick) { e.preventDefault(); onClick(e); } }} {...props}>{children}</a>,
}));

vi.mock('@/components/ThemeToggle', () => ({
    default: () => <div data-testid="theme-toggle" />
}));

import { useLocation, useNavigate } from '@tanstack/react-router'

describe('ActivityBar Component', () => {
    it('renders top icons', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<ActivityBar isExplorerOpen={true} onToggleExplorer={() => { }} setIsExplorerOpen={() => { }} lastVisitedPath="/" />);

        expect(screen.getByTitle('Explorer')).toBeTruthy();
        expect(screen.getByTitle('GitHub Profile')).toBeTruthy();
        expect(screen.getByTitle('Debug')).toBeTruthy();
    });

    it('toggles explorer', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        const onToggle = vi.fn();

        render(<ActivityBar isExplorerOpen={false} onToggleExplorer={onToggle} setIsExplorerOpen={() => { }} lastVisitedPath="/" />);

        const explorerButton = screen.getByTitle('Explorer');
        fireEvent.click(explorerButton);

        expect(onToggle).toHaveBeenCalled();
    });

    it('highlights debug icon when active', () => {
        (useLocation as any).mockReturnValue({ pathname: '/debug' });
        const setIsExplorerOpen = vi.fn();

        render(<ActivityBar isExplorerOpen={false} onToggleExplorer={() => { }} setIsExplorerOpen={setIsExplorerOpen} lastVisitedPath="/" />);

        const debugLink = screen.getByTitle('Debug');
        // Check for the active border style
        expect(debugLink.className).toContain('border-l-2');

        fireEvent.click(debugLink);
        expect(setIsExplorerOpen).toHaveBeenCalledWith(false);
    });

    it('navigates to lastVisitedPath when explorer clicked on debug page', () => {
        (useLocation as any).mockReturnValue({ pathname: '/debug' });

        const mockNavigate = vi.fn();
        // Override the default mock implementation to return our spy
        (useNavigate as any).mockReturnValue(mockNavigate);

        const setIsExplorerOpen = vi.fn();
        const lastVisitedPath = '/projects';

        render(<ActivityBar isExplorerOpen={false} onToggleExplorer={() => { }} setIsExplorerOpen={setIsExplorerOpen} lastVisitedPath={lastVisitedPath} />);

        const explorerButton = screen.getByTitle('Explorer');
        fireEvent.click(explorerButton);

        expect(mockNavigate).toHaveBeenCalledWith({ to: lastVisitedPath });
        // The component calls onToggleExplorer, but also setIsExplorerOpen(true) if navigating back?
        // Let's check the implementation logic. 
        // In ActivityBar.tsx: if (location.pathname === '/debug') { ... setIsExplorerOpen(true); ... }
        expect(setIsExplorerOpen).toHaveBeenCalledWith(true);
    });
});
