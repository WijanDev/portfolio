import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import CssCode from '@components/CssCode'

export const Route = createFileRoute('/contact')({ component: Contact })

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        alert('Message sent (demo)!')
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
                            />
                        </div>
                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
