import { createFileRoute } from '@tanstack/react-router'
import { ProjectComponent } from '@/components/ProjectComponent'

export const Route = createFileRoute('/projects')({ component: Projects })

function Projects() {

    const projects = [
        {
            title: 'Toolbox',
            description: 'A collection of tools for finances and developers.',
            tags: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Start'],
            link: 'https://toolbox.wijan.dev',
            github: 'https://github.com/WijanDev/toolbox'
        },
    ]

    return (
        <div className="p-[30px]">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-[var(--vscode-border)] font-mono">
                <span className="text-[var(--vscode-token-keyword)]">const</span>{' '}
                <span className="text-[var(--vscode-token-variable)]">Projects</span>{' '}
                <span className="text-[var(--vscode-token-punctuation)]">=</span>{' '}
                <span className="text-[var(--vscode-token-keyword)]">()</span>{' '}
                <span className="text-[var(--vscode-token-keyword)]">{'=>'}</span>
            </h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                {projects.map((project, index) => (
                    <ProjectComponent key={index} {...project} />
                ))}
            </div>

            <div className="mt-6 text-[var(--vscode-token-comment)] italic">
                {'// More projects coming soon.'}
            </div>
        </div>
    )
}
