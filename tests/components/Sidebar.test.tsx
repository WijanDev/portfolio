
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Sidebar from '@/components/Sidebar'

vi.mock('@tanstack/react-router', () => ({
    useLocation: vi.fn(),
    Link: ({ children, className }: any) => <div className={className}>{children}</div>,
}));

import { useLocation } from '@tanstack/react-router'

describe('Sidebar Component', () => {
    it('renders initial expanded state', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<Sidebar />);

        expect(screen.getByText('PORTFOLIO')).toBeTruthy();
        expect(screen.getByText('src')).toBeTruthy();
        expect(screen.getByText('readme.md')).toBeTruthy();
    });

    it('toggles PORTFOLIO folder', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<Sidebar />);

        const portfolioFolder = screen.getByText('PORTFOLIO');

        // Collapse
        fireEvent.click(portfolioFolder);
        expect(screen.queryByText('src')).toBeNull();

        // Expand
        fireEvent.click(portfolioFolder);
        expect(screen.getByText('src')).toBeTruthy();
    });

    it('toggles src folder', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<Sidebar />);

        const srcFolder = screen.getByText('src');

        // Collapse src
        fireEvent.click(srcFolder);
        expect(screen.queryByText('readme.md')).toBeNull();

        // Expand src
        fireEvent.click(srcFolder);
        expect(screen.getByText('readme.md')).toBeTruthy();
    });

    it('highlights active file', () => {
        (useLocation as any).mockReturnValue({ pathname: '/projects' });
        render(<Sidebar />);

        // We mocked Link to render a div with the className
        // We can find the element containing 'projects.tsx' and check its parent or itself
        // In the Sidebar code: <Link ... className="file-item active"> ... <span>projects.tsx</span> ... </Link>
        // The mock renders: <div className="file-item active"> ... </div>

        // Find the text "projects.tsx"
        const projectsText = screen.getByText('projects.tsx');
        // The parent (mocked Link) should have the class
        const linkDiv = projectsText.parentElement;
        expect(linkDiv?.className).toContain('active');

        // Home should not be active
        const readmeText = screen.getByText('readme.md');
        expect(readmeText.parentElement?.className).not.toContain('active');
    });
});
