
import { describe, it, expect, vi } from 'vitest'
import { getRouter } from '../src/router'
import { createRouter } from '@tanstack/react-router'

// Mock the route tree since it's generated
vi.mock('../src/routeTree.gen', () => ({
    routeTree: {}
}));

vi.mock('@tanstack/react-router', () => ({
    createRouter: vi.fn(() => ({ routerInstance: true })),
}));

describe('Router', () => {
    it('creates router with correct configuration', () => {
        const router = getRouter();

        expect(createRouter).toHaveBeenCalledWith(expect.objectContaining({
            routeTree: expect.any(Object),
            context: {},
            scrollRestoration: true,
            defaultPreloadStaleTime: 0,
        }));

        expect(router).toEqual({ routerInstance: true });
    });
});
