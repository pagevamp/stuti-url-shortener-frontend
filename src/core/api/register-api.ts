import { UserRegistrationParams } from "../types/register-types"
import apiClient from "@/src/lib/axios-client"

export const registerUser = (body: UserRegistrationParams) => {
  return apiClient.post(`/auth/sign-up`, body)
}
