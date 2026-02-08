
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Route } from '@/routes/__root'

vi.mock('@tanstack/react-router', async () => {
    return {
        createRootRoute: (options: any) => options,
        Outlet: () => <div data-testid="outlet">Outlet Content</div>,
        ScrollRestoration: () => null,
        HeadContent: () => null,
        Scripts: () => null,
    };
});

vi.mock('@tanstack/react-router-devtools', () => ({
    TanStackRouterDevtoolsPanel: () => null,
}));

vi.mock('@tanstack/react-devtools', () => ({
    TanStackDevtools: () => null,
}));

vi.mock('@/components/Layout', () => ({
    default: ({ children }: any) => <div data-testid="layout">{children}</div>
}));

describe('Root Route', () => {
    it('renders layout and outlet', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        const RootComponent = (Route as any).shellComponent;

        render(
            <RootComponent>
                <div data-testid="outlet" />
            </RootComponent>
        );

        expect(screen.getByTestId('layout')).toBeTruthy();
        expect(screen.getByTestId('outlet')).toBeTruthy();

        consoleErrorSpy.mockRestore();
    });

    it('defines correct head metadata', () => {
        const headFn = (Route as any).head;
        expect(headFn).toBeDefined();

        const headData = headFn();
        expect(headData.meta).toEqual(expect.arrayContaining([
            { charSet: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { title: 'wijan.dev' },
        ]));

        expect(headData.links).toBeDefined();
        // We can't easily check the exact URL since it's an import, but we can check structure
        expect(headData.links[0].rel).toBe('stylesheet');
    });
});
