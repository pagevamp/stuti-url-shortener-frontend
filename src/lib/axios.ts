import axios from "axios"
import toast from "react-hot-toast"
import { cookies } from "next/headers"

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

const createApiInstance = (baseURL: string | undefined) => {
  const instance = axios.create({ baseURL, timeout: 5000 })

  instance.interceptors.request.use(
    async (config) => {
      try {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get("jwt")

        if (accessToken && config.headers) {
          config.headers["Authorization"] = `Bearer ${accessToken}`
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(`Invalid token in cookies : ${err.message} `)
        }
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return instance
}

export const api = createApiInstance(BASE_API_URL)
