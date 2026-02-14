import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import CssCode from '@components/CssCode'
import { sendEmail } from '../server/send-email'

export const Route = createFileRoute('/contact')({ component: Contact })

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('submitting')
        setErrorMessage('')

        try {
            const result = await sendEmail({ data: formData })

            if (result.success) {
                setStatus('success')
                setFormData({ name: '', email: '', message: '' })
            } else {
                setStatus('error')
                setErrorMessage(String(result.error) || 'Failed to send message')
            }
        } catch (error) {
            console.error(error)
            setStatus('error')
            setErrorMessage('An unexpected error occurred')
        }
    }

    const socialMedia = {
        github: { text: 'https://github.com/WijanDev', url: 'https://github.com/WijanDev' },
        linkedin: { text: 'https://linkedin.com/in/wijan-ruiz-mok', url: 'https://www.linkedin.com/in/wijan-ruiz-mok/' }
    }

    const sendMessageForm = {
        display: 'flex',
        'flex-direction': 'column',
        gap: '1rem'
    }

    return (
        <div className="p-[30px] flex flex-wrap gap-10 max-w-[1000px]">
            <div className="flex-1 min-w-[300px] font-mono text-sm leading-relaxed">
                <div className="text-[#6a9955] italic mb-4">
                    {'/* Contact Information */'}
                </div>

                <CssCode
                    selector=".social-media"
                    content={socialMedia}
                />

                <CssCode
                    selector="#send-message-form"
                    content={sendMessageForm}
                />
            </div>

            <div className="flex-1 min-w-[300px] bg-[var(--vscode-sidebar-bg)] p-6 border border-[var(--vscode-border)]">
                <div className="contact-form">
                    <h2 className="text-xl text-[var(--vscode-fg)] mb-5">Send Message</h2>
                    {status === 'success' && (
                        <div className="text-green-500 mb-4">
                            Message sent successfully!
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="text-red-500 mb-4">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-xs text-[var(--vscode-fg)] mb-1 opacity-80">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] p-2 text-[var(--vscode-input-fg)] font-sans focus:outline focus:outline-1 focus:outline-[var(--vscode-status-bar-bg)] focus:border-[var(--vscode-status-bar-bg)]"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                disabled={status === 'submitting'}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-xs text-[var(--vscode-fg)] mb-1 opacity-80">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] p-2 text-[var(--vscode-input-fg)] font-sans focus:outline focus:outline-1 focus:outline-[var(--vscode-status-bar-bg)] focus:border-[var(--vscode-status-bar-bg)]"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                disabled={status === 'submitting'}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-xs text-[var(--vscode-fg)] mb-1 opacity-80">Message</label>
                            <textarea
                                id="message"
                                className="w-full bg-[var(--vscode-input-bg)] border border-[var(--vscode-border)] p-2 text-[var(--vscode-input-fg)] font-sans focus:outline focus:outline-1 focus:outline-[var(--vscode-status-bar-bg)] focus:border-[var(--vscode-status-bar-bg)]"
                                rows={5}
                                placeholder="Type your message..."
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                disabled={status === 'submitting'}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[var(--vscode-status-bar-bg)] text-white py-2.5 px-5 border-0 cursor-pointer mt-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={status === 'submitting'}
                        >
                            {status === 'submitting' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
