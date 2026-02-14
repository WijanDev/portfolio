import React from 'react';

interface JsonCodeProps {
    readonly variableName: string;
    readonly data: any;
}

export default function JsonCode({ variableName, data }: Readonly<JsonCodeProps>) {

    const renderValue = (value: any, suffix: string = ''): React.ReactNode => {
        const punctuation = suffix ? <span className="text-[var(--vscode-token-punctuation)]">{suffix}</span> : null;

        if (value === null) {
            return <><span className="text-[var(--vscode-token-keyword)]">null</span>{punctuation}</>;
        }

        if (typeof value === 'boolean') {
            return <><span className="text-[var(--vscode-token-keyword)]">{value.toString()}</span>{punctuation}</>;
        }

        if (typeof value === 'number') {
            return <><span className="text-[var(--vscode-token-number)]">{value}</span>{punctuation}</>;
        }

        if (typeof value === 'string') {
            return <><span className="text-[var(--vscode-token-string)]">{`'${value}'`}</span>{punctuation}</>;
        }

        if (Array.isArray(value)) {
            if (value.length === 0) return <><span className="text-[var(--vscode-token-punctuation)]">[]</span>{punctuation}</>;

            return (
                <>
                    <span className="text-[var(--vscode-token-punctuation)]">[</span>
                    {value.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={index} style={{ paddingLeft: '32px' }}>
                            {renderValue(item, index === value.length - 1 ? '' : ',')}
                        </div>
                    ))}
                    <div>
                        <span className="text-[var(--vscode-token-punctuation)]">]</span>{punctuation}
                    </div>
                </>
            );
        }

        if (typeof value === 'object') {
            const entries = Object.entries(value);
            if (entries.length === 0) return <><span className="text-[var(--vscode-token-punctuation)]">{'{'}{'}'}</span>{punctuation}</>;

            return (
                <>
                    <span className="text-[var(--vscode-token-punctuation)]">{'{'}</span>
                    {entries.map(([key, val], index) => (
                        <div key={key} style={{ paddingLeft: '32px' }}>
                            <span className="text-[var(--vscode-token-variable)]">{key}</span>
                            <span className="text-[var(--vscode-token-punctuation)]">:</span>{' '}
                            {renderValue(val, index === entries.length - 1 ? '' : ',')}
                        </div>
                    ))}
                    <div>
                        <span className="text-[var(--vscode-token-punctuation)]">{'}'}</span>{punctuation}
                    </div>
                </>
            );
        }

        return <span>{String(value)}</span>;
    };

    return (
        <div className="mb-6 font-mono leading-relaxed text-base text-[var(--vscode-fg)]">
            <span className="text-[var(--vscode-token-keyword)]">const</span>{' '}
            <span className="text-[var(--vscode-token-variable)]">{variableName}</span>{' '}
            <span className="text-[var(--vscode-token-punctuation)]">=</span>{' '}
            {renderValue(data, ';')}
        </div>
    );
}
