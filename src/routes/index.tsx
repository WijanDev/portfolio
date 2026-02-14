import { createFileRoute, Link } from '@tanstack/react-router'
import JsonCode from '@/components/JsonCode'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const developerData = {
    name: 'Wijan Ruiz Mok',
    role: 'Senior Software Engineer',
    status: 'Open to work',
  };

  return (
    <div className="p-10 max-w-[800px] text-[var(--vscode-fg)] font-mono text-base leading-relaxed">
      <div className="mb-6">
        <span className="text-[var(--vscode-token-keyword)]">import</span>{' '}
        <span className="text-[var(--vscode-token-punctuation)]">{'{'}</span>{' '}
        <span className="text-[var(--vscode-token-variable)]">Portfolio</span>{' '}
        <span className="text-[var(--vscode-token-punctuation)]">{'}'}</span>{' '}
        <span className="text-[var(--vscode-token-keyword)]">from</span>{' '}
        <span className="text-[var(--vscode-token-string)]">'@/portfolio'</span>
        <span className="text-[var(--vscode-fg)]">-</span>
      </div>

      <div className="mt-8 font-sans">
        <h1 className="text-[2.5rem] text-[var(--vscode-fg)] mb-4 font-sans">Hi, I'm</h1>
        <JsonCode variableName="SoftwareEngineer" data={developerData} />
        <p className="mb-4">
          Welcome to my IDE-themed portfolio.
          I build full stack web applications with a focus on performance, scalability, and maintainability.
        </p>
        <p className="text-[var(--vscode-fg)] opacity-60">
          Feel free to explore my projects using the file explorer on the left.
        </p>

        <div className="flex gap-4 mt-6">
          <Link to="/projects" className="bg-[var(--vscode-status-bar-bg)] text-white py-2 px-4 no-underline font-sans text-sm border-0 cursor-pointer hover:opacity-90">
            View Projects
          </Link>
          <Link to="/contact" className="bg-[var(--vscode-activity-bar-bg)] text-[var(--vscode-activity-bar-fg)] py-2 px-4 no-underline font-sans text-sm border-0 cursor-pointer hover:opacity-90">
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  )
}
