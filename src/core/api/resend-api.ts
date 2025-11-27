import api from "@/src/lib/axios"
import { ResendEmailParams } from "./../types/resend-types"

export const resendVerification = (body: ResendEmailParams) => {
  return api.post(`/auth/resend-verification`, body)
}
