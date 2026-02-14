import { ExternalLink, GitBranch } from "lucide-react";

export interface ProjectComponentProps {
    title: string;
    description: string;
    tags: string[];
    link: string;
    github: string;
}

export function ProjectComponent({ title, description, tags, link, github }: Readonly<ProjectComponentProps>) {
    return (
        <div className="bg-[var(--vscode-sidebar-bg)] p-4 border border-[var(--vscode-border)] transition-colors hover:border-[var(--vscode-status-bar-bg)] flex flex-col">
            <h3 className="text-lg font-bold text-[#4fc1ff] mb-2">{title}</h3>
            <p className="text-sm text-[var(--vscode-fg)] mb-4 flex-1">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map(tag => (
                    <span key={tag} className="bg-[var(--vscode-bg)] text-[#ce9178] px-2 py-1 text-xs rounded-[3px] border border-[var(--vscode-border)]">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex gap-4 mt-auto">
                <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-[#9cdcfe] hover:text-[var(--vscode-fg)] hover:underline decoration-[var(--vscode-fg)]">
                    <GitBranch size={14} style={{ marginRight: '4px' }} /> Code
                </a>
                <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-[#9cdcfe] hover:text-[var(--vscode-fg)] hover:underline decoration-[var(--vscode-fg)]">
                    <ExternalLink size={14} style={{ marginRight: '4px' }} /> Live Demo
                </a>
            </div>
        </div>
    );
}