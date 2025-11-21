import { api } from "@/src/lib/axios"
import { userRegistrationParams } from "../types"

export const userRegister = (body: userRegistrationParams) => {
  return api.post(`/auth/sign-up`, body)
}
