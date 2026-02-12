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
vi.mock('@/components/Sidebar', () => ({
    default: ({ onItemClick }: any) => (
        <div data-testid="sidebar">
            <button onClick={onItemClick}>Select Item</button>
        </div>
    )
}));
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
    });

    it('closes sidebar on mobile when item is clicked', () => {
        // Mock mobile viewport
        global.innerWidth = 500;
        fireEvent(window, new Event('resize'));

        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<Layout>Content</Layout>);

        // Sidebar is open initially
        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toBeTruthy();

        // Find the button inside mocked Sidebar that triggers onItemClick
        const selectItemBtn = screen.getByText('Select Item');

        // Click it
        fireEvent.click(selectItemBtn);

        // Expect sidebar to be gone
        expect(screen.queryByTestId('sidebar')).toBeNull();
    });

    it('keeps sidebar open on desktop when item is clicked', () => {
        // Mock desktop viewport
        global.innerWidth = 1024;
        fireEvent(window, new Event('resize'));

        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<Layout>Content</Layout>);

        // Sidebar is open initially
        const sidebar = screen.getByTestId('sidebar');
        expect(sidebar).toBeTruthy();

        // Find the button inside mocked Sidebar that triggers onItemClick
        const selectItemBtn = screen.getByText('Select Item');

        // Click it
        fireEvent.click(selectItemBtn);

        // Expect sidebar to still be there
        expect(screen.getByTestId('sidebar')).toBeTruthy();
    });
});