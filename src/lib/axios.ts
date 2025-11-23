import axios from "axios"

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

const createApiInstance = (baseURL: string | undefined) => {
  const instance = axios.create({ baseURL, timeout: 5000 })

  instance.interceptors.request.use(
    (config) => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token")
          const accessToken = token ? token : null

          if (accessToken && config.headers) {
            config.headers["Authorization"] = `Bearer ${accessToken}`
          }
        }
      } catch (err) {
        console.error("Invalid token in localStorage", err)
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
