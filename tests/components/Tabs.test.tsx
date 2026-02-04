
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Tabs from '@/components/Tabs'

// Mock the router hooks and Link component
vi.mock('@tanstack/react-router', () => ({
    useLocation: vi.fn(),
    Link: ({ children, className }: any) => <a className={className}>{children}</a>,
}));

import { useLocation } from '@tanstack/react-router'

describe('Tabs Component', () => {
    it('highlight active tab', () => {
        // Mock current path to be '/'
        (useLocation as any).mockReturnValue({ pathname: '/' });

        render(<Tabs />);

        const homeTab = screen.getByText('home.tsx').closest('a');
        expect(homeTab?.className).toContain('active');

        const projectsTab = screen.getByText('projects.tsx').closest('a');
        expect(projectsTab?.className).not.toContain('active');
    });

    it('renders all tabs', () => {
        (useLocation as any).mockReturnValue({ pathname: '/projects' });
        render(<Tabs />);

        expect(screen.getByText('home.tsx')).toBeTruthy();
        expect(screen.getByText('projects.tsx')).toBeTruthy();
        expect(screen.getByText('contact.css')).toBeTruthy();

        // Check active tab matches mock
        const projectsTab = screen.getByText('projects.tsx').closest('a');
        expect(projectsTab?.className).toContain('active');
    });
});
