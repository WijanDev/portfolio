import { createFileRoute } from '@tanstack/react-router'
import JsonCode from '@components/JsonCode'

export const Route = createFileRoute('/package')({
    component: PackageJson,
})

function PackageJson() {
    const packageData = {
        "name": "portfolio",
        "version": "1.0.0",
        "description": "IDE-themed portfolio built with modern web technologies",
        "dependencies": {
            "react": "^19.2.0",
            "tanstack-start": "^1.0.0",
            "typescript": "^5.7.0",
            "vite": "^6.0.0",
            "nitro": "nightly",
            "vitest": "^2.1.0",
            "lucide": "^0.460.0"
        }
    };

    return (
        <div style={{ padding: '32px' }}>
            <h1>package.json</h1>
            <div style={{ marginBottom: '16px', color: '#6a9955', fontFamily: 'Consolas, monospace' }}>
                {'// Simplified view of project dependencies'}
            </div>
            <JsonCode variableName="packageJson" data={packageData} />
        </div>
    )
}
