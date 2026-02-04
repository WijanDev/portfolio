
import { render, screen, fireEvent } from '@testing-library/react'
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
        expect(screen.getAllByTestId('css-code')).toBeTruthy();
    });

    it('handles form submission', () => {
        const alertMock = vi.spyOn(globalThis.window, 'alert').mockImplementation(() => { });
        const ContactComponent = (Route as any).component;
        render(<ContactComponent />);

        const nameInput = screen.getByPlaceholderText('Your Name');
        const emailInput = screen.getByPlaceholderText('email@example.com');
        const messageInput = screen.getByPlaceholderText('Type your message...');
        const submitButton = screen.getByRole('button', { name: /send message/i });

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(messageInput, { target: { value: 'Hello' } });

        fireEvent.click(submitButton);

        expect(alertMock).toHaveBeenCalledWith('Message sent (demo)!');
        alertMock.mockRestore();
    });
});
