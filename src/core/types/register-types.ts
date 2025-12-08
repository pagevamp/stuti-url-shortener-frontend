import * as z from "zod"
import { registerFormValidationSchema } from "../validation/register-validation"

export interface UserRegistrationParams {
  username: string
  fullName: string
  email: string
  password: string
}

export type RegisterErrors = Partial<
  Record<keyof z.infer<typeof registerFormValidationSchema>, string>
>
