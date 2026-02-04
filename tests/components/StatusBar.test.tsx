
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StatusBar from '@/components/StatusBar'

describe('StatusBar Component', () => {
    it('renders branch name', () => {
        render(<StatusBar />);
        expect(screen.getByText('main')).toBeTruthy();
    });

    it('renders error/warning counts', () => {
        render(<StatusBar />);
        expect(screen.getAllByText('0')).toHaveLength(2);
    });

    it('renders cursor position', () => {
        render(<StatusBar />);
        expect(screen.getByText('Ln 12, Col 45')).toBeTruthy();
    });

    it('renders encoding and language', () => {
        render(<StatusBar />);
        expect(screen.getByText('UTF-8')).toBeTruthy();
        expect(screen.getByText('TypeScript React')).toBeTruthy();
    });
});
