
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Route } from '@/routes/index'

// Mock createFileRoute to return component options
vi.mock('@tanstack/react-router', async () => {
    const actual = await vi.importActual('@tanstack/react-router');
    return {
        ...actual as any,
        createFileRoute: () => (options: any) => options,
        Link: ({ children, className }: any) => <a className={className}>{children}</a>,
    };
});

describe('Index Route', () => {
    it('renders home content', () => {
        const HomeComponent = (Route as any).component;
        render(<HomeComponent />);

        expect(screen.getByText("Hi, I'm")).toBeTruthy();
        expect(screen.getByText("View Projects")).toBeTruthy();
    });
});
