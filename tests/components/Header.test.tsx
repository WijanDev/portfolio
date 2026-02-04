
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from '@/components/Header'

vi.mock('@tanstack/react-router', () => ({
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
}));

describe('Header Component', () => {
    it('renders navigation links', () => {
        render(<Header />);
        expect(screen.getByText('Home')).toBeTruthy();
        expect(screen.getByText('Start - Server Functions')).toBeTruthy();
    });
});
