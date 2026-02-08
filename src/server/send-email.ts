import { createServerFn } from '@tanstack/react-start'
import { contactSchema, emailHandler } from './email-service'

export const sendEmail = createServerFn({ method: "POST" })
    .inputValidator(contactSchema)
    .handler(emailHandler)
