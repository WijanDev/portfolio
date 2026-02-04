
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ActivityBar from '@/components/ActivityBar'

// Mock icons to avoid rendering large SVGs if not necessary (optional, but keep it simple for now)
// Mock router
vi.mock('@tanstack/react-router', () => ({
    useLocation: vi.fn(),
    Link: ({ children, className, onClick }: any) => <div className={className} onClick={onClick}>{children}</div>,
}));

import { useLocation } from '@tanstack/react-router'

describe('ActivityBar Component', () => {
    it('renders top icons', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<ActivityBar isExplorerOpen={true} onToggleExplorer={() => { }} setIsExplorerOpen={() => { }} />);

        // Check for presence of key icons by finding their container divs or checking implementation details logic
        // Since icons are components, we can check for the link to github
        const githubLink = screen.getByRole('link', { name: '' }); // Since there's no text, maybe check href directly?
        expect(githubLink).toBeTruthy();
        expect(githubLink.getAttribute('href')).toBe('https://github.com/WijanDev/portfolio');
    });

    it('toggles explorer', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        const onToggle = vi.fn();

        render(<ActivityBar isExplorerOpen={false} onToggleExplorer={onToggle} setIsExplorerOpen={() => { }} />);

        // Files icon is the first one
        const filesIcon = document.querySelector('.icon-container');
        fireEvent.click(filesIcon!);

        expect(onToggle).toHaveBeenCalled();
    });

    it('highlights debug icon when active', () => {
        (useLocation as any).mockReturnValue({ pathname: '/debug' });
        const setIsExplorerOpen = vi.fn();

        render(<ActivityBar isExplorerOpen={false} onToggleExplorer={() => { }} setIsExplorerOpen={setIsExplorerOpen} />);

        // Debug icon is 4th in top list (files, search, github, debug)
        // Or we can query by container class if unique? No, all are icon-container.
        // But debug container has click handler 

        // Let's rely on the 'active' class which should be on the debug container
        const containers = document.querySelectorAll('.icon-container');
        // Files(0), Search(1), Github(2), Debug(3)
        const debugContainer = containers[3];

        expect(debugContainer.className).toContain('active');

        fireEvent.click(debugContainer);
        expect(setIsExplorerOpen).toHaveBeenCalledWith(false);
    });
});
