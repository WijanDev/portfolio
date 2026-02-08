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
        <div className="contact-container">
            <div className="contact-info">
                <div className="token-comment" style={{ marginBottom: '16px' }}>
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

            <div className="contact-form-container">
                <div className="contact-form">
                    <h2>Send Message</h2>
                    {status === 'success' && (
                        <div className="success-message" style={{ color: 'green', marginBottom: '1rem' }}>
                            Message sent successfully!
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-input"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                disabled={status === 'submitting'}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                disabled={status === 'submitting'}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                id="message"
                                className="form-textarea"
                                rows={5}
                                placeholder="Type your message..."
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                disabled={status === 'submitting'}
                            />
                        </div>
                        <button
                            type="submit"
                            className="submit-btn"
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
