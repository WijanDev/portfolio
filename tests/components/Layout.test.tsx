
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Layout from '@/components/Layout'

// Mock sub-components to focus on Layout logic
vi.mock('@/components/ActivityBar', () => ({
    default: ({ onToggleExplorer }: any) => (
        <div data-testid="activity-bar">
            <button onClick={onToggleExplorer}>Toggle</button>
        </div>
    )
}));
vi.mock('@/components/Sidebar', () => ({ default: () => <div data-testid="sidebar">Sidebar</div> }));
vi.mock('@/components/StatusBar', () => ({ default: () => <div data-testid="status-bar">StatusBar</div> }));
vi.mock('@/components/Tabs', () => ({ default: () => <div data-testid="tabs">Tabs</div> }));

describe('Layout Component', () => {
    it('renders layout structure', () => {
        render(<Layout><div>Child Content</div></Layout>);

        expect(screen.getByTestId('activity-bar')).toBeTruthy();
        // Explorer is open by default
        expect(screen.getByTestId('sidebar')).toBeTruthy();
        expect(screen.getByTestId('tabs')).toBeTruthy();
        expect(screen.getByTestId('status-bar')).toBeTruthy();
        expect(screen.getByText('Child Content')).toBeTruthy();
    });

    it('toggles sidebar visibility', () => {
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
});
