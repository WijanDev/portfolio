
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ThemeToggle from '@/components/ThemeToggle'

describe('ThemeToggle Component', () => {
    beforeEach(() => {
        // Clear localStorage and reset document attribute/class
        localStorage.clear();
        delete document.documentElement.dataset.theme;
        document.documentElement.classList.remove('dark');
        vi.clearAllMocks();

        // Mock matchMedia for dark mode preference
        Object.defineProperty(globalThis, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: query === '(prefers-color-scheme: dark)',
                media: query,
                onchange: null,
                addListener: vi.fn(), // deprecated
                removeListener: vi.fn(), // deprecated
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    });

    it('renders toggle button', () => {
        render(<ThemeToggle />);
        const button = screen.getByRole('button');
        expect(button).toBeTruthy();
    });

    it('initializes with dark theme by default (or system preference)', () => {
        render(<ThemeToggle />);
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(screen.getByRole('button')).toBeTruthy();
    });

    it('toggles theme on click', () => {
        render(<ThemeToggle />);

        const button = screen.getByRole('button');

        // Initial state dark (from previous test setup or default)
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        // Click to toggle to light
        fireEvent.click(button);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        expect(localStorage.getItem('theme')).toBe('light');

        // Click to toggle back to dark
        fireEvent.click(button);
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('loads saved preference from localStorage', () => {
        localStorage.setItem('theme', 'light');
        render(<ThemeToggle />);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('uses light theme if system prefers light and no saved preference', () => {
        // Override mock to return false for dark mode preference
        Object.defineProperty(globalThis, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: false, // Always false implies light mode preference for 'dark' query
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });

        render(<ThemeToggle />);
        // Should default to light since matchMedia(dark) is false
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
});
