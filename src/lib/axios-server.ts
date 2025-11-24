"use server"

import axios from "axios"
import { cookies } from "next/headers"

const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 5000,
  withCredentials: true,
})

apiServer.interceptors.request.use(async (config) => {
 const cookieStore = await cookies()
 const accessToken = cookieStore.get("accessToken")
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

export default apiServer
