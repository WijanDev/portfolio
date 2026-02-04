
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Route } from '@/routes/__root'

vi.mock('@tanstack/react-router', async () => {
    return {
        createRootRoute: () => (options: any) => options,
        Outlet: () => <div data-testid="outlet">Outlet Content</div>,
        ScrollRestoration: () => null,
    };
});

vi.mock('@/components/Layout', () => ({
    default: ({ children }: any) => <div data-testid="layout">{children}</div>
}));

describe('Root Route', () => {
    it('renders layout and outlet', () => {
        const RootComponent = (Route as any).shellComponent;
        render(<RootComponent />);

        expect(screen.getByTestId('layout')).toBeTruthy();
        expect(screen.getByTestId('outlet')).toBeTruthy();
    });
});
