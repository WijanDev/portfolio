import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, GitBranch } from 'lucide-react'

export const Route = createFileRoute('/projects')({ component: Projects })

function Projects() {
    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-featured online store built with Next.js, Stripe, and Tailwind.',
            tags: ['Next.js', 'Stripe', 'Tailwind'],
            link: '#',
            github: '#'
        },
        {
            title: 'Task Management App',
            description: 'Productivity tool with drag-and-drop Kanban board.',
            tags: ['React', 'Redux', 'Firebase'],
            link: '#',
            github: '#'
        },
        {
            title: 'Portfolio v1',
            description: 'My previous portfolio site styled with minimalistic modern design.',
            tags: ['HTML', 'Sass', 'JavaScript'],
            link: '#',
            github: '#'
        }
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
                {'// More projects coming soon...'}
            </div>
        </div>
    )
}
