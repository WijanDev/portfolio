import React from 'react';

interface JsonCodeProps {
    readonly variableName: string;
    readonly data: any;
}

export default function JsonCode({ variableName, data }: Readonly<JsonCodeProps>) {

    const renderValue = (value: any, suffix: string = ''): React.ReactNode => {
        const punctuation = suffix ? <span className="token-punctuation">{suffix}</span> : null;

        if (value === null) {
            return <><span className="token-keyword">null</span>{punctuation}</>;
        }

        if (typeof value === 'boolean') {
            return <><span className="token-keyword">{value.toString()}</span>{punctuation}</>;
        }

        if (typeof value === 'number') {
            return <><span className="token-number">{value}</span>{punctuation}</>;
        }

        if (typeof value === 'string') {
            return <><span className="token-string">'{value}'</span>{punctuation}</>;
        }

        if (Array.isArray(value)) {
            if (value.length === 0) return <><span className="token-paren">[]</span>{punctuation}</>;

            return (
                <>
                    <span className="token-paren">[</span>
                    {value.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={index} style={{ paddingLeft: '32px' }}>
                            {renderValue(item, index === value.length - 1 ? '' : ',')}
                        </div>
                    ))}
                    <div>
                        <span className="token-paren">]</span>{punctuation}
                    </div>
                </>
            );
        }

        if (typeof value === 'object') {
            const entries = Object.entries(value);
            if (entries.length === 0) return <><span className="token-bracket">{'{'}{'}'}</span>{punctuation}</>;

            return (
                <>
                    <span className="token-bracket">{'{'}</span>
                    {entries.map(([key, val], index) => (
                        <div key={key} style={{ paddingLeft: '32px' }}>
                            <span className="token-property">{key}</span>
                            <span className="token-punctuation">:</span>{' '}
                            {renderValue(val, index === entries.length - 1 ? '' : ',')}
                        </div>
                    ))}
                    <div>
                        <span className="token-bracket">{'}'}</span>{punctuation}
                    </div>
                </>
            );
        }

        return <span>{String(value)}</span>;
    };

    return (
        <div className="code-block" style={{ fontFamily: 'Consolas, monospace', lineHeight: '1.5' }}>
            <span className="token-keyword">const</span>{' '}
            <span className="token-variable" style={{ color: '#4fc1ff' }}>{variableName}</span>{' '}
            <span className="token-operator">=</span>{' '}
            {renderValue(data, ';')}
        </div>
    );
}
