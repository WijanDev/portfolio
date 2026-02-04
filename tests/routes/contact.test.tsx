
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Route } from '@/routes/contact'

vi.mock('@tanstack/react-router', async () => {
    return {
        createFileRoute: () => (options: any) => options,
    };
});

// Mock CssCode since it's used in Contact
vi.mock('@/components/CssCode', () => ({
    default: ({ selector }: any) => <div data-testid="css-code">{selector}</div>
}));

describe('Contact Route', () => {
    it('renders contact info', () => {
        const ContactComponent = (Route as any).component;
        render(<ContactComponent />);

        expect(screen.getByRole('heading', { level: 2, name: "Send Message" })).toBeTruthy();
        // Check if mocks for CssCode are effectively rendered or if we check container text
        // If we mock CssCode, we can check for selector text or testid
        expect(screen.getAllByTestId('css-code')).toBeTruthy();
    });
});
