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
        <div className="projects-container">
            <h2 className="projects-header">
                <span className="token-keyword">const</span>{' '}
                <span className="token-function">Projects</span>{' '}
                <span className="token-operator">=</span>{' '}
                <span className="token-paren">()</span>{' '}
                <span className="token-keyword">{'=>'}</span>
            </h2>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <ProjectComponent key={index} {...project} />
                ))}
            </div>

            <div style={{ marginTop: '24px' }} className="token-comment">
                {'// More projects coming soon.'}
            </div>
        </div>
    )
}
