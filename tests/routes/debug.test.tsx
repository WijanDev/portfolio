
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Route } from '@/routes/debug'

vi.mock('@tanstack/react-router', async () => {
    return {
        createFileRoute: () => (options: any) => options,
    };
});

describe('Debug Route', () => {
    it('renders debug console', () => {
        const DebugComponent = (Route as any).component;
        // Mock state setters if needed or just render
        render(<DebugComponent />);


        expect(screen.getByText("Variables")).toBeTruthy();
        expect(screen.getByText("Call Stack")).toBeTruthy();
    });
});
