interface CssCodeProps {
    readonly selector: string;
    readonly content: Readonly<Record<string, string | number | { text: string; url: string }>>;
}

export default function CssCode({ selector, content }: Readonly<CssCodeProps>) {

    const getRenderedValue = (value: string | number | { text: string; url: string }) => {
        if (typeof value === 'object' && value !== null) {
            return (
                <span className="token-string">
                    '<a href={value.url} target="_blank" rel="noopener noreferrer" style={{ color: '#ce9178', textDecoration: 'underline' }}>{value.text}</a>'
                </span>
            );
        } else if (typeof value === 'number') {
            return <span className="token-number">{value}</span>;
        } else {
            return (
                <span className="token-string">
                    {/* Check if value looks like a number with unit, or a quoted string */}
                    {value.toString().startsWith("'") ? value : `'${value}'`}
                </span>
            );
        }
    }

    return (
        <div style={{ marginBottom: '16px', fontFamily: 'Consolas, monospace', lineHeight: '1.5' }}>
            <span className="token-variable" style={{ color: '#d7ba7d' }}>{selector}</span>{' '}
            <span className="token-bracket">{'{'}</span>

            {Object.entries(content).map(([property, value]) => {
                const renderedValue = getRenderedValue(value);

                return (
                    <div key={property} style={{ paddingLeft: '32px' }}>
                        <span className="token-property">{property}</span>
                        <span className="token-punctuation">:</span>{' '}
                        {renderedValue}
                        <span className="token-punctuation">;</span>
                    </div>
                );
            })}

            <span className="token-bracket">{'}'}</span>
        </div>
    );
}
