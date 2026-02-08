
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Route } from '@/routes/package'

vi.mock('@tanstack/react-router', async () => {
    return {
        createFileRoute: () => (options: any) => options,
    };
});

vi.mock('@/components/JsonCode', () => ({
    default: ({ variableName, data }: any) => (
        <div data-testid="json-code" data-variable={variableName}>
            {JSON.stringify(data)}
        </div>
    )
}));

describe('Package Route', () => {
    it('renders package.json title and comments', () => {
        const PackageComponent = (Route as any).component;
        render(<PackageComponent />);

        expect(screen.getByRole('heading', { level: 1, name: 'package.json' })).toBeTruthy();
        expect(screen.getByText('// Simplified view of project dependencies')).toBeTruthy();
    });

    it('renders JsonCode with correct data', () => {
        const PackageComponent = (Route as any).component;
        render(<PackageComponent />);

        const jsonCode = screen.getByTestId('json-code');
        expect(jsonCode).toBeTruthy();
        expect(jsonCode.dataset.variable).toBe('packageJson');

        // Verify some content in the stringified data
        expect(jsonCode.textContent).toContain('dependencies');
        expect(jsonCode.textContent).toContain('react');
        expect(jsonCode.textContent).toContain('tanstack-start');
    });
});
