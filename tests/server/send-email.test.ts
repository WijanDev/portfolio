// Mock createServerFn to bypass framework logic
vi.mock('@tanstack/react-start', () => {
    return {
        createServerFn: () => ({
            inputValidator: () => ({
                handler: (handler: any) => async (data: any) => {
                    return handler(data)
                }
            })
        })
    }
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sendEmail } from '@/server/send-email'
// We import real things but we mocked them
import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo'
// ... (rest of file)

vi.mock('@getbrevo/brevo', () => {
    const sendTransacEmail = vi.fn();
    const setApiKey = vi.fn();

    // Use function declaration because it's called with 'new'
    const TransactionalEmailsApi = vi.fn(function () {
        return {
            setApiKey,
            sendTransacEmail,
        }
    });

    // Attach spies
    (TransactionalEmailsApi as any).sendTransacEmail = sendTransacEmail;
    (TransactionalEmailsApi as any).setApiKey = setApiKey;

    // Use function declaration here too just in case
    const SendSmtpEmail = vi.fn(function () { return {} });
    (TransactionalEmailsApi as any).SendSmtpEmail = SendSmtpEmail;

    return {
        TransactionalEmailsApi,
        TransactionalEmailsApiApiKeys: { apiKey: 'apiKey' },
        SendSmtpEmail
    }
})

describe('sendEmail Server Function', () => {
    const mocks = {
        sendTransacEmail: (TransactionalEmailsApi as any).sendTransacEmail,
        setApiKey: (TransactionalEmailsApi as any).setApiKey,
        SendSmtpEmail: (TransactionalEmailsApi as any).SendSmtpEmail
    }

    beforeEach(() => {
        vi.clearAllMocks()
        process.env.BREVO_API_KEY = 'test-api-key'
        process.env.CONTACT_EMAIL = 'contact@test.com'
    })

    it('sends email successfully', async () => {
        mocks.sendTransacEmail.mockResolvedValue({ body: { messageId: 'msg-123' } })

        const input = {
            name: 'Test User',
            email: 'test@user.com',
            message: 'Hello World',
        }

        const result: any = await sendEmail({ data: input })

        expect(result).toEqual({
            success: true,
            data: { messageId: 'msg-123' },
        })

        expect(TransactionalEmailsApi).toHaveBeenCalled()
        expect(mocks.setApiKey).toHaveBeenCalledWith('apiKey', 'test-api-key')

        expect(SendSmtpEmail).toHaveBeenCalled()

        expect(mocks.sendTransacEmail).toHaveBeenCalledTimes(1)
        const emailObj = mocks.sendTransacEmail.mock.calls[0][0]

        expect(emailObj).toEqual(expect.objectContaining({
            subject: 'Has recibido un mensaje desde el portfolio de   Test User',
            replyTo: { email: 'test@user.com', name: 'Test User' },
        }))
        expect(emailObj.htmlContent).toContain('Test User')
        expect(emailObj.htmlContent).toContain('Hello World')
    })

    it('handles api error', async () => {
        mocks.sendTransacEmail.mockRejectedValue({
            body: { message: 'Invalid API Key' }
        })

        const input = {
            name: 'Test User',
            email: 'test@user.com',
            message: 'Hello',
        }

        const result: any = await sendEmail({ data: input })

        expect(result).toEqual({
            success: false,
            error: 'Invalid API Key',
        })
    })

    it('handles generic error', async () => {
        mocks.sendTransacEmail.mockRejectedValue(new Error('Network Error'))

        const input = {
            name: 'Test User',
            email: 'test@user.com',
            message: 'Hello',
        }

        const result: any = await sendEmail({ data: input })

        expect(result).toEqual({
            success: false,
            error: 'Network Error',
        })
    })
})
