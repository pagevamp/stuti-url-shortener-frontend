import axios from "axios"
import { UserRegistrationParams } from "../types/register-types"

export const registerUser = (body: UserRegistrationParams) => {
  return axios.post(`/auth/sign-up`, body)
}
