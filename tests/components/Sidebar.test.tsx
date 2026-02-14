
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Sidebar from '@/components/Sidebar'

vi.mock('@tanstack/react-router', () => ({
    useLocation: vi.fn(),
    Link: ({ children, className, onClick, ...props }: any) => <button className={className} onClick={onClick} {...props}>{children}</button>,
}));

vi.mock('@/components/ui/drawer', () => ({
    Drawer: ({ open, children }: any) => (
        open ? <div data-testid="drawer">{children}</div> : null
    ),
    DrawerContent: ({ children }: any) => <div data-testid="drawer-content">{children}</div>,
    DrawerHeader: ({ children }: any) => <div>{children}</div>,
    DrawerTitle: ({ children }: any) => <div>{children}</div>,
    DrawerDescription: ({ children }: any) => <div>{children}</div>,
}));

import { useLocation } from '@tanstack/react-router'

describe('Sidebar Component', () => {
    const defaultProps = {
        isDesktopOpen: true,
        isMobileOpen: false,
        setMobileOpen: vi.fn(),
    };

    it('renders initial expanded state', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<Sidebar {...defaultProps} />);

        expect(screen.getByText('PORTFOLIO')).toBeTruthy();
        expect(screen.getByText('src')).toBeTruthy();
        expect(screen.getByText('readme.md')).toBeTruthy();
    });

    it('toggles PORTFOLIO folder', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<Sidebar {...defaultProps} />);

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
        render(<Sidebar {...defaultProps} />);

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
        render(<Sidebar {...defaultProps} />);

        // We mocked Link to render a div with the className
        // We can find the element containing 'projects.tsx' and check its parent or itself
        // In the Sidebar code: <Link ... className="... bg-[var(--vscode-selection)] ..."> ... <span>projects.tsx</span> ... </Link>
        // The mock renders: <div className="... bg-[var(--vscode-selection)] ..."> ... </div>

        // Find the text "projects.tsx"
        const projectsText = screen.getByText('projects.tsx');
        // The parent (mocked Link) should have the class
        const linkDiv = projectsText.parentElement;
        expect(linkDiv?.className).toContain('bg-[var(--vscode-selection)]');

        // Home should not be active
        const readmeText = screen.getByText('readme.md');
        expect(readmeText.parentElement?.className).not.toContain('bg-[var(--vscode-selection)]');
    });

    it('renders contact and package.json links', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        render(<Sidebar {...defaultProps} />);

        expect(screen.getByText('contact.css')).toBeTruthy();
        expect(screen.getByText('package.json')).toBeTruthy();
    });

    it('highlights active contact key', () => {
        (useLocation as any).mockReturnValue({ pathname: '/contact' });
        render(<Sidebar {...defaultProps} />);

        const contactText = screen.getByText('contact.css');
        const linkDiv = contactText.parentElement;
        expect(linkDiv?.className).toContain('bg-[var(--vscode-selection)]');
    });

    it('highlights active package.json', () => {
        (useLocation as any).mockReturnValue({ pathname: '/package' });
        render(<Sidebar {...defaultProps} />);

        const packageText = screen.getByText('package.json');
        const linkDiv = packageText.parentElement;
        expect(linkDiv?.className).toContain('bg-[var(--vscode-selection)]');
    });

    it('handles mobile drawer interactions', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        const setMobileOpen = vi.fn();
        const onItemClick = vi.fn();

        render(<Sidebar
            isDesktopOpen={false}
            isMobileOpen={true}
            setMobileOpen={setMobileOpen}
            onItemClick={onItemClick}
        />);

        // Verify drawer content is visible
        expect(screen.getByTestId('drawer-content')).toBeTruthy();

        // Click an item (e.g. PORTFOLIO toggle or a file link)
        // Let's click a file link to trigger onItemClick
        const readmeLink = screen.getByText('readme.md').closest('div');
        // Note: Link mock renders a div.

        if (readmeLink) {
            fireEvent.click(readmeLink);
        } else {
            throw new Error('readme.md link not found');
        }

        // Verify setMobileOpen(false) called (from Sidebar.tsx wrapper)
        expect(setMobileOpen).toHaveBeenCalledWith(false);

        // Verify onItemClick called
        expect(onItemClick).toHaveBeenCalled();
    });
    it('handles desktop item click with callback', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        const onItemClick = vi.fn();

        render(<Sidebar {...defaultProps} onItemClick={onItemClick} />);

        // Click a file link (Desktop mode)
        const readmeLink = screen.getByText('readme.md').closest('div');
        if (readmeLink) fireEvent.click(readmeLink);

        expect(onItemClick).toHaveBeenCalled();
    });

    it('handles desktop item click without callback', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });

        // Render without onItemClick
        render(<Sidebar {...defaultProps} onItemClick={undefined} />);

        // Click a file link
        const readmeLink = screen.getByText('readme.md').closest('div');

        // Should not throw
        if (readmeLink) fireEvent.click(readmeLink);
    });
    it('handles mobile drawer interactions without callback', () => {
        (useLocation as any).mockReturnValue({ pathname: '/' });
        const setMobileOpen = vi.fn();

        // Render without onItemClick
        render(<Sidebar
            isDesktopOpen={false}
            isMobileOpen={true}
            setMobileOpen={setMobileOpen}
            onItemClick={undefined}
        />);

        // Click a file link inside drawer
        const readmeLink = screen.getByText('readme.md').closest('div');

        if (readmeLink) {
            fireEvent.click(readmeLink);
        }

        // Verify setMobileOpen(false) called
        expect(setMobileOpen).toHaveBeenCalledWith(false);
        // Verify no error thrown (implicit)
    });
});
