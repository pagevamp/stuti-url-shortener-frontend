import { UserRegistrationParams } from "../types/register-types"
import api from "@/src/lib/axios-client"

export const registerUser = (body: UserRegistrationParams) => {
  return api.post(`/auth/sign-up`, body)
}
