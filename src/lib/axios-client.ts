import axios from "axios"

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 5000,
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  console.log("Request sent:", config.url)
  return config
})

export default apiClient
