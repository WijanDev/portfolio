import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Layout from '@/components/Layout'
import { useLocation } from '@tanstack/react-router'

// Mock router hooks BEFORE imports that use them
vi.mock('@tanstack/react-router', () => ({
    useLocation: vi.fn(),
    useNavigate: vi.fn(() => vi.fn()),
    Link: ({ children }: any) => <div>{children}</div>
}));

// Mock sub-components
vi.mock('@/components/ActivityBar', () => ({
    default: ({ onToggleExplorer, lastVisitedPath }: any) => (
        <div data-testid="activity-bar" data-last-visited={lastVisitedPath}>
            <button onClick={onToggleExplorer}>Toggle</button>
        </div>
    )
}));
vi.mock('@/components/Sidebar', () => ({ default: () => <div data-testid="sidebar">Sidebar</div> }));
vi.mock('@/components/StatusBar', () => ({ default: () => <div data-testid="status-bar">StatusBar</div> }));
vi.mock('@/components/Tabs', () => ({ default: () => <div data-testid="tabs">Tabs</div> }));
vi.mock('@/components/ThemeToggle', () => ({ default: () => <div data-testid="theme-toggle">ThemeToggle</div> }));

describe('Layout Component', () => {
    it('renders layout structure', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<Layout><div>Child Content</div></Layout>);

        expect(screen.getByTestId('activity-bar')).toBeTruthy();
        expect(screen.getByTestId('sidebar')).toBeTruthy();
        expect(screen.getByTestId('tabs')).toBeTruthy();
        expect(screen.getByTestId('status-bar')).toBeTruthy();
        expect(screen.getByTestId('theme-toggle')).toBeTruthy();
        expect(screen.getByText('Child Content')).toBeTruthy();
    });

    it('toggles sidebar visibility', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<Layout>Content</Layout>);

        const toggleBtn = screen.getByText('Toggle');

        // Initial state: visible
        expect(screen.getByTestId('sidebar')).toBeTruthy();

        // Click to hide
        fireEvent.click(toggleBtn);
        expect(screen.queryByTestId('sidebar')).toBeNull();

        // Click to show
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toBeTruthy();
    });

    it('tracks last visited path correctly', () => {
        // Default / path
        (useLocation as any).mockReturnValue({ pathname: '/projects' });
        const { rerender } = render(<Layout>Content</Layout>);

        const activityBar = screen.getByTestId('activity-bar');
        expect(activityBar.dataset.lastVisited).toBe('/projects');

        // Navigate to /debug - should NOT update last visited
        (useLocation as any).mockReturnValue({ pathname: '/debug' });
        rerender(<Layout>Content</Layout>);

        expect(activityBar.dataset.lastVisited).toBe('/projects');

        // Navigate back to /contact - should update
        (useLocation as any).mockReturnValue({ pathname: '/contact' });
        rerender(<Layout>Content</Layout>);

        expect(activityBar.dataset.lastVisited).toBe('/contact');
    })
});
