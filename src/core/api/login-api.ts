import { UserLoginParams } from "../types/login-types"
import apiClient from "@/src/lib/axios-client"

export const loginUser = (body: UserLoginParams) => {
  return apiClient.post(`/auth/login`, body)
}
