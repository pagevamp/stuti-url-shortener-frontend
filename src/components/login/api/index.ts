import { api } from "@/src/lib/axios"
import { userLoginParams } from "../types"

export const userLogin = (body: userLoginParams) => {
  return api.post(`/auth/login`,body)
}
