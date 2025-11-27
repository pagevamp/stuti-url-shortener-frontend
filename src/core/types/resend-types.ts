import * as z from "zod"
import { resendEmailValidationSchema } from "../validation/resend-validation"

export interface ResendEmailParams {
  email: string
}

export type ResendErrors = Partial<
  Record<keyof z.infer<typeof resendEmailValidationSchema>, string>
>
