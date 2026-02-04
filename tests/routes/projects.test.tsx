
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

        expect(screen.getByText("Projects")).toBeTruthy();
        expect(screen.getByText("Portfolio v1")).toBeTruthy();
    });
});
