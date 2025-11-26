import { UserLoginParams } from "../types/login-types"
import api from "@/src/lib/axios-client"

export const loginUser = (body: UserLoginParams) => {
  return api.post(`/auth/login`, body)
}
