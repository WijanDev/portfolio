import { createFileRoute, Link } from '@tanstack/react-router'
import JsonCode from '../components/JsonCode'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const developerData = {
    name: 'Wijan Ruiz Mok',
    role: 'Senior Software Engineer',
    status: 'Open to work',
  };

  return (
    <div className="home-container">
      <div className="code-block">
        <span className="token-keyword">import</span>{' '}
        <span className="token-variable token-bracket">{'{'}</span>{' '}
        <span className="token-variable">Portfolio</span>{' '}
        <span className="token-variable token-bracket">{'}'}</span>{' '}
        <span className="token-keyword">from</span>{' '}
        <span className="token-string">'@/portfolio'</span>
        <span className="token-punctuation">;</span>
      </div>



      <div className="home-content" style={{ marginTop: '32px' }}>
        <h1>Hi, I'm</h1>
        <JsonCode variableName="SoftwareEngineer" data={developerData} />
        <p>
          Welcome to my IDE-themed portfolio.
          I build full stack web applications with a focus on performance, scalability, and maintainability.
        </p>
        <p style={{ color: '#9a9a9a' }}>
          Feel free to explore my projects using the file explorer on the left.
        </p>

        <div className="action-buttons">
          <Link to="/projects" className="btn-primary">
            View Projects
          </Link>
          <Link to="/contact" className="btn-secondary">
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  )
}
