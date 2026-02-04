
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import JsonCode from '@/components/JsonCode'

describe('JsonCode Component', () => {
    it('renders variable name and string value', () => {
        const data = "hello world";
        render(<JsonCode variableName="myVar" data={data} />);

        expect(screen.getByText('myVar')).toBeTruthy();
        expect(screen.getByText("'hello world'")).toBeTruthy();
    });

    it('renders number value', () => {
        render(<JsonCode variableName="count" data={42} />);
        expect(screen.getByText('42')).toBeTruthy();
    });

    it('renders boolean value', () => {
        render(<JsonCode variableName="isActive" data={true} />);
        expect(screen.getByText('true')).toBeTruthy();
    });

    it('renders null value', () => {
        render(<JsonCode variableName="empty" data={null} />);
        expect(screen.getByText('null')).toBeTruthy();
    });

    it('renders object keys', () => {
        const data = { name: "test", id: 123 };
        render(<JsonCode variableName="user" data={data} />);

        expect(screen.getByText('name')).toBeTruthy();
        expect(screen.getByText('id')).toBeTruthy();
        expect(screen.getByText("'test'")).toBeTruthy();
        expect(screen.getByText('123')).toBeTruthy();
    });

    it('renders empty array', () => {
        render(<JsonCode variableName="list" data={[]} />);
        expect(screen.getByText('[]')).toBeTruthy();
    });

    it('renders nested array', () => {
        render(<JsonCode variableName="matrix" data={[1, [2]]} />);
        expect(screen.getAllByText('[')).toBeTruthy();
        expect(screen.getByText('1')).toBeTruthy();
        expect(screen.getByText('2')).toBeTruthy();
    });

    it('renders empty object', () => {
        render(<JsonCode variableName="obj" data={{}} />);
        expect(screen.getByText('{}')).toBeTruthy();
    });

    it('renders fallback for undefined', () => {
        render(<JsonCode variableName="unknown" data={undefined} />);
        expect(screen.getByText('undefined')).toBeTruthy();
    });
});
