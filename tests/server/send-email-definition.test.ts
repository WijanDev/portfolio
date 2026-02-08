
import { describe, it, expect, vi } from 'vitest'

// We need to mock createServerFn because it runs when the file is imported
vi.mock('@tanstack/react-start', () => ({
    createServerFn: () => ({
        inputValidator: () => ({
            handler: () => ({})
        })
    })
}))

import { sendEmail } from '@/server/send-email'

describe('sendEmail Definition', () => {
    it('should be defined', () => {
        expect(sendEmail).toBeDefined()
    })
})
