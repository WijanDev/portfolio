
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

import { useLocation, useNavigate } from '@tanstack/react-router'

describe('ActivityBar Component', () => {
    it('renders top icons', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<ActivityBar isExplorerOpen={true} onToggleExplorer={() => { }} setIsExplorerOpen={() => { }} lastVisitedPath="/" />);

        // Check for presence of key icons by finding their container divs or checking implementation details logic
        // Since icons are components, we can check for the link to github
        const githubLink = screen.getByRole('link', { name: 'GitHub Profile' });
        expect(githubLink).toBeTruthy();
        expect(githubLink.getAttribute('href')).toBe('https://github.com/WijanDev/portfolio');
    });

    it('toggles explorer', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        const onToggle = vi.fn();

        render(<ActivityBar isExplorerOpen={false} onToggleExplorer={onToggle} setIsExplorerOpen={() => { }} lastVisitedPath="/" />);

        // Files icon is the first one
        const filesIcon = document.querySelector('.icon-container');
        fireEvent.click(filesIcon!);

        expect(onToggle).toHaveBeenCalled();
    });

    it('highlights debug icon when active', () => {
        (useLocation as any).mockReturnValue({ pathname: '/debug' });
        const setIsExplorerOpen = vi.fn();

        render(<ActivityBar isExplorerOpen={false} onToggleExplorer={() => { }} setIsExplorerOpen={setIsExplorerOpen} lastVisitedPath="/" />);

        // Debug icon is 4th in top list (files, search, github, debug)
        const containers = document.querySelectorAll('.icon-container');
        // Files(0), Search(1), Github(2), Debug(3)
        const debugContainer = containers[3];
        expect(debugContainer.className).toContain('active');

        fireEvent.click(debugContainer);
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

        const explorerIcon = document.querySelectorAll('.icon-container')[0];
        fireEvent.click(explorerIcon);

        expect(mockNavigate).toHaveBeenCalledWith({ to: lastVisitedPath });
        expect(setIsExplorerOpen).toHaveBeenCalledWith(true);
    });
});
