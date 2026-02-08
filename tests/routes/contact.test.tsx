
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Route } from '@/routes/contact'

// Mock dependencies
vi.mock('@tanstack/react-router', async () => {
    return {
        createFileRoute: () => (options: any) => options,
    };
});

vi.mock('@/components/CssCode', () => ({
    default: ({ selector }: any) => <div data-testid="css-code">{selector}</div>
}));

// Create a mock function for sendEmail
const mockSendEmail = vi.fn();

// Mock the module that exports sendEmail
vi.mock('@/server/send-email', () => ({
    sendEmail: (...args: any[]) => mockSendEmail(...args),
}));

describe('Contact Route', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders contact info', () => {
        const ContactComponent = (Route as any).component;
        render(<ContactComponent />);

        expect(screen.getByRole('heading', { level: 2, name: "Send Message" })).toBeTruthy();
        expect(screen.getAllByTestId('css-code')).toBeTruthy();
    });

    it('handles form submission success', async () => {
        // Setup mock return value
        mockSendEmail.mockResolvedValue({ success: true, data: { messageId: '123' } });

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

        // Check for loading state
        expect(screen.getByText('Sending...')).toBeTruthy();

        // Wait for success message
        await waitFor(() => {
            expect(screen.getByText('Message sent successfully!')).toBeTruthy();
        });

        // Verify mock was called with correct data
        expect(mockSendEmail).toHaveBeenCalledWith({
            data: {
                name: 'John Doe',
                email: 'john@example.com',
                message: 'Hello'
            }
        });
    });

    it('handles form submission error', async () => {
        // Setup mock to simulate error
        mockSendEmail.mockResolvedValue({ success: false, error: 'Server error' });

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

        // Wait for error message
        await waitFor(() => {
            expect(screen.getByText('Server error')).toBeTruthy();
        });
    });

    it('handles empty error message from server', async () => {
        // Setup mock to simulate error without message
        mockSendEmail.mockResolvedValue({ success: false, error: '' });

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

        // Wait for default error message
        await waitFor(() => {
            expect(screen.getByText('Failed to send message')).toBeTruthy();
        });
    });

    it('handles unexpected exceptions during submission', async () => {
        // Setup mock to throw exception
        mockSendEmail.mockRejectedValue(new Error('Network error'));

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

        // Wait for generic error message
        await waitFor(() => {
            // "An unexpected error occurred" is set in catch block
            expect(screen.getByText('An unexpected error occurred')).toBeTruthy();
        });
    });
});
