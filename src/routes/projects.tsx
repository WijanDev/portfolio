import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, GitBranch } from 'lucide-react'

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
                    <div key={index} className="project-card">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-desc">{project.description}</p>

                        <div className="project-tags">
                            {project.tags.map(tag => (
                                <span key={tag} className="tag">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="project-links">
                            <a href={project.github} className="project-link">
                                <GitBranch size={14} style={{ marginRight: '4px' }} /> Code
                            </a>
                            <a href={project.link} className="project-link">
                                <ExternalLink size={14} style={{ marginRight: '4px' }} /> Live Demo
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '24px' }} className="token-comment">
                {'// More projects coming soon.'}
            </div>
        </div>
    )
}
