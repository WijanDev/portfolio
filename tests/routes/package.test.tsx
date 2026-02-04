
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Route } from '@/routes/package'

vi.mock('@tanstack/react-router', async () => {
    return {
        createFileRoute: () => (options: any) => options,
    };
});

// Mock JsonCode
vi.mock('@/components/JsonCode', () => ({
    default: ({ variableName }: any) => <div data-testid="json-code">{variableName}</div>
}));

describe('Package Route', () => {
    it('renders package.json data', () => {
        const PackageComponent = (Route as any).component;
        render(<PackageComponent />);

        expect(screen.getByText("package.json")).toBeTruthy();
    });
});
