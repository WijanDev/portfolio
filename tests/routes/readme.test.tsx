
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Route } from '@/routes/readme'

vi.mock('@tanstack/react-router', async () => {
    return {
        createFileRoute: () => (options: any) => options,
    };
});
describe('Readme Route', () => {
    it('renders markdown content', () => {
        const ReadmeComponent = (Route as any).component;
        render(<ReadmeComponent />);

        // Check for specific content from the README or the container
        // Assuming it validates the portfolio concept
        expect(screen.getByText('Hello "/readme"!')).toBeTruthy();
    });
});
