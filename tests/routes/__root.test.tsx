
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'
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

        // Validating the component directly because it renders an <html> tag
        // which cannot be rendered inside a test container (div)
        const result = RootComponent({ children: <div data-testid="outlet" /> });

        expect(result.type).toBe('html');
        expect(result.props.children[1].type).toBe('body');

        // The body's first child should be Layout
        const bodyChildren = result.props.children[1].props.children;
        const layout = bodyChildren[0];

        expect(layout.type).not.toBeNull();

        expect(layout.props.children).toEqual(<div data-testid="outlet" />);

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

    it('renders lazy loaded devtools in development', async () => {
        // This test aims to hit the lazy loading lines (11, 17)
        // We need to actually render the component returned by React.lazy
        // to convert the module object to a component and trigger the import.

        const RootComponent = (Route as any).shellComponent;
        const result = RootComponent({ children: <div /> });

        // Find TanStackDevtools in the tree
        // html -> body -> [Layout, TanStackDevtools, Scripts]
        // result.props.children[1] is body. children of body is array.
        const bodyChildren = result.props.children[1].props.children;

        const DevtoolsElement = bodyChildren[1];
        const LazyDevtoolsComponent = DevtoolsElement.type;

        const plugins = DevtoolsElement.props.plugins;
        const routerDevtoolsElement = plugins[0].render;

        // Now render them to trigger the Lazy load
        // We use 'render' from testing-library, inside Suspense
        render(
            <React.Suspense fallback={<div data-testid="loading">Loading...</div>}>
                <LazyDevtoolsComponent />
                {routerDevtoolsElement}
            </React.Suspense>
        );

        // Wait for the lazy component (which is mocked to return null) to resolve.
        // Since our mock returns null, we can't search for it directly.
        // However, we can update the mock in this test to return something searchable.
        // But since we can't easily change the mock mid-test for the lazy import without complex setup,
        // let's rely on the fact that the suspense fallback should disappear.

        await waitFor(() => {
            expect(screen.queryByTestId('loading')).toBeNull();
        });
    });

    it('checks production environment', async () => {
        vi.resetModules();
        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'production';

        try {
            const { Route: ProdRoute } = await import('@/routes/__root');
            const ProdRootComponent = (ProdRoute as any).shellComponent;
            const result = ProdRootComponent({ children: <div /> });

            const bodyChildren = result.props.children[1].props.children;
            // In production, TanStackDevtools is () => null
            // bodyChildren[1] is the React Element <TanStackDevtools />
            const DevtoolsElement = bodyChildren[1];

            // The type of the element should be the component function () => null
            expect(typeof DevtoolsElement.type).toBe('function');
            expect((DevtoolsElement.type)({})).toBeNull();

        } finally {
            process.env.NODE_ENV = originalEnv;
        }
    });
});
