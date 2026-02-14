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
    default: ({ onItemClick, isDesktopOpen, isMobileOpen }: any) => (
        (isDesktopOpen || isMobileOpen) ? (
            <div data-testid="sidebar" data-mobile-open={isMobileOpen}>
                <button onClick={onItemClick}>Select Item</button>
            </div>
        ) : null
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
        // ThemeToggle is inside ActivityBar, which is mocked and does not render children/slots in this mock
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

    it('handles mobile sidebar interactions', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });

        // Mock window.innerWidth
        const originalInnerWidth = globalThis.innerWidth;
        Object.defineProperty(globalThis, 'innerWidth', { writable: true, configurable: true, value: 500 });

        render(<Layout>Content</Layout>);

        const toggleBtn = screen.getByText('Toggle');

        // Initial mobile state: hidden (isMobileExplorerOpen defaults to false)
        // Check data-mobile-open is "false"
        const sidebar = screen.getByTestId('sidebar'); // Sidebar renders because isDesktopOpen=true
        expect(sidebar.dataset.mobileOpen).toBe('false');

        // Click Toggle -> should toggle mobile open
        fireEvent.click(toggleBtn);
        expect(sidebar.dataset.mobileOpen).toBe('true');

        // Click Select Item (simulating navigation) -> should close mobile drawer
        const selectItemBtn = screen.getByText('Select Item');
        fireEvent.click(selectItemBtn);

        expect(sidebar.dataset.mobileOpen).toBe('false');

        Object.defineProperty(globalThis, 'innerWidth', { writable: true, configurable: true, value: originalInnerWidth });
    });

    it('handles desktop sidebar interactions', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });

        const originalInnerWidth = globalThis.innerWidth;
        Object.defineProperty(globalThis, 'innerWidth', { writable: true, configurable: true, value: 1024 });

        render(<Layout>Content</Layout>);

        const sidebar = screen.getByTestId('sidebar');

        // Ensure we are in desktop mode (data-mobile-open should be false initially)
        expect(sidebar.dataset.mobileOpen).toBe('false');

        // Click Select Item
        const selectItemBtn = screen.getByText('Select Item');
        fireEvent.click(selectItemBtn);

        // Should remain closed (false) - verifying that setMobileOpen(false) wasn't called/didn't change state
        // In desktop mode, clicking an item shouldn't affect mobile state or toggle visibility
        expect(sidebar.dataset.mobileOpen).toBe('false');

        // Toggle button in desktop mode should toggle isExplorerOpen, NOT isMobileExplorerOpen
        // We can't easily check isExplorerOpen state directly via the mock which ORs them.
        // But we can check that data-mobile-open remains false.

        const toggleBtn = screen.getByText('Toggle');
        fireEvent.click(toggleBtn);

        expect(sidebar.dataset.mobileOpen).toBe('false');

        Object.defineProperty(globalThis, 'innerWidth', { writable: true, configurable: true, value: originalInnerWidth });
    });
});