import * as z from "zod"
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const resendEmailValidationSchema = z.object({
  email: z
    .email()
    .min(1, "Email is required")
    .regex(emailRegex, "Must be a valid Email address"),
})
