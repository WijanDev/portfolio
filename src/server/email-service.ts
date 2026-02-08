
import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys, SendSmtpEmail } from '@getbrevo/brevo'
import { z } from 'zod'

export const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
    message: z.string().min(1, 'Message is required'),
})

export const emailHandler = async ({ data }: { data: z.infer<typeof contactSchema> }) => {
    const apiInstance = new TransactionalEmailsApi()
    apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '')
    const sendSmtpEmail = new SendSmtpEmail();
    const { name, email, message } = data
    sendSmtpEmail.subject = `Has recibido un mensaje desde el portfolio de   ${name}`;
    sendSmtpEmail.htmlContent = `<html><body><p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong><br/>${message.replaceAll('\n', '<br/>')}</p></body></html>`;
    sendSmtpEmail.sender = { "name": "Portfolio Contact Form", "email": process.env.CONTACT_EMAIL || "contact@wijan.dev" };
    sendSmtpEmail.to = [{ "email": process.env.CONTACT_EMAIL || "wijanruiz@gmail.com", "name": "Wijan Ruiz" }];
    sendSmtpEmail.replyTo = { "email": email, "name": name };
    try {
        const { body } = await apiInstance.sendTransacEmail(sendSmtpEmail);
        return { success: true, data: { messageId: body.messageId } }
    } catch (error: any) {
        const errorMessage = error.body?.message || error.message || 'Failed to send email'
        return { success: false, error: errorMessage }
    }
}
