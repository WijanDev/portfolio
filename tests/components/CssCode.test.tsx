
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CssCode from '@/components/CssCode'

describe('CssCode Component', () => {
    it('renders selector and properties', () => {
        const content = {
            'font-size': '16px',
            'color': '#fff'
        };
        render(<CssCode selector=".my-class" content={content} />);

        expect(screen.getByText('.my-class')).toBeTruthy();
        expect(screen.getByText('font-size')).toBeTruthy();
        expect(screen.getByText("'16px'")).toBeTruthy();
        expect(screen.getByText('color')).toBeTruthy();
        expect(screen.getByText("'#fff'")).toBeTruthy();
    });

    it('renders numbers correctly', () => {
        const content = {
            'opacity': 1,
            'z-index': 100
        };
        render(<CssCode selector="#id" content={content} />);

        expect(screen.getByText('1')).toBeTruthy();
        expect(screen.getByText('100')).toBeTruthy();
    });

    it('renders links (objects)', () => {
        const content = {
            'background-image': {
                text: 'url(image.png)',
                url: 'http://example.com/image.png'
            }
        };
        render(<CssCode selector="body" content={content} />);

        // Use getAllByText or check stricter structure if needed, 
        // but checking the text content presence is a good start.
        // The component renders: '<a ...>text</a>' literally as a string token?
        // Let's check the code:
        // <span className="token-string">'<a href={value.url} ...>{value.text}</a>'</span>
        // Wait, looking at CssCode.tsx, lines 17-18:
        // '<a href={value.url} ... >{value.text}</a>'
        // It renders the *string representation* of an HTML tag?
        // Yes, it returns a React node, but inside a span.

        const link = screen.getByRole('link', { name: 'url(image.png)' });
        expect(link).toBeTruthy();
        expect(link.getAttribute('href')).toBe('http://example.com/image.png');
    });

    it('handles quoted strings correctly', () => {
        const content = {
            'content': "'before'"
        };
        render(<CssCode selector="div::before" content={content} />);
        // Should NOT add extra quotes if already quoted
        expect(screen.getByText("'before'")).toBeTruthy();
    });
});
