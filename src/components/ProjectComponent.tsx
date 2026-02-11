import { ExternalLink, GitBranch } from "lucide-react";

export interface ProjectComponentProps {
    title: string;
    description: string;
    tags: string[];
    link: string;
    github: string;
}

export function ProjectComponent({ title, description, tags, link, github }: ProjectComponentProps) {
    return <div className="project-card">
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>

        <div className="project-tags">
            {tags.map(tag => (
                <span key={tag} className="tag">
                    {tag}
                </span>
            ))}
        </div>

        <div className="project-links">
            <a href={github} target="_blank" rel="noopener noreferrer" className="project-link">
                <GitBranch size={14} style={{ marginRight: '4px' }} /> Code
            </a>
            <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
                <ExternalLink size={14} style={{ marginRight: '4px' }} /> Live Demo
            </a>
        </div>
    </div>
}