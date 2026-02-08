
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Route } from '@/routes/projects'

vi.mock('@tanstack/react-router', async () => {
    return {
        createFileRoute: () => (options: any) => options,
        Link: ({ children, className }: any) => <a className={className}>{children}</a>
    };
});

describe('Projects Route', () => {
    it('renders projects list', () => {
        const ProjectsComponent = (Route as any).component;
        render(<ProjectsComponent />);

        // Check header (split in spans)
        // Since it's split, getByText("Projects") might work if textContent matches, but screen.getByText matches node text usually.
        // The header is: <span ...>Projects</span>
        expect(screen.getByText("Projects")).toBeTruthy();

        // Check project titles
        expect(screen.getByText("E-Commerce Platform")).toBeTruthy();
        expect(screen.getByText("Task Management App")).toBeTruthy();
        expect(screen.getByText("Portfolio v1")).toBeTruthy();
    });

    it('renders project tags', () => {
        const ProjectsComponent = (Route as any).component;
        render(<ProjectsComponent />);

        expect(screen.getByText("Next.js")).toBeTruthy();
        expect(screen.getByText("Stripe")).toBeTruthy();
        expect(screen.getByText("React")).toBeTruthy();
        expect(screen.getByText("Redux")).toBeTruthy();
    });

    it('renders project links correctly', () => {
        const ProjectsComponent = (Route as any).component;
        render(<ProjectsComponent />);

        const links = screen.getAllByRole('link');
        // We have 3 projects * 2 links each (code, demo) = 6 links
        expect(links.length).toBeGreaterThanOrEqual(6);

        // Check hrefs (mock data has '#')
        links.forEach(link => {
            expect(link.getAttribute('href')).toBe('#');
        });
    });
});
