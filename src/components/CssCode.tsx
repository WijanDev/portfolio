interface CssCodeProps {
    readonly selector: string;
    readonly content: Readonly<Record<string, string | number | { text: string; url: string }>>;
}

export default function CssCode({ selector, content }: Readonly<CssCodeProps>) {

    const getRenderedValue = (value: string | number | { text: string; url: string }) => {
        if (typeof value === 'object' && value !== null) {
            return (
                <span className="text-[var(--vscode-token-string)]">
                    '<a href={value.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--vscode-token-string)', textDecoration: 'underline' }}>{value.text}</a>'
                </span>
            );
        } else if (typeof value === 'number') {
            return <span className="text-[var(--vscode-token-number)]">{value}</span>;
        } else {
            return (
                <span className="text-[var(--vscode-token-string)]">
                    {/* Check if value looks like a number with unit, or a quoted string */}
                    {value.toString().startsWith("'") ? value : `'${value}'`}
                </span>
            );
        }
    }

    return (
        <div className="mb-4 font-mono leading-relaxed text-[var(--vscode-fg)]">
            <span className="text-[var(--vscode-token-type)]">{selector}</span>{' '}
            <span className="text-[var(--vscode-token-punctuation)]">{'{'}</span>

            {Object.entries(content).map(([property, value]) => {
                const renderedValue = getRenderedValue(value);

                return (
                    <div key={property} style={{ paddingLeft: '32px' }}>
                        <span className="text-[var(--vscode-token-variable)]">{property}</span>
                        <span className="text-[var(--vscode-token-punctuation)]">:</span>{' '}
                        {renderedValue}
                        <span className="text-[var(--vscode-token-punctuation)]">;</span>
                    </div>
                );
            })}

            <span className="text-[var(--vscode-token-punctuation)]">{'}'}</span>
        </div>
    );
}
