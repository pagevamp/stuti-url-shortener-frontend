import { useState } from "react"
import { LoginErrors } from "../components/login/types"
import { loginFormValidationSchema } from "../components/login/validation"
import { userLogin } from "../components/login/api"
import { useRouter } from "next/navigation"

export function useLogin() {
  const router = useRouter()
  const [error, setError] = useState<LoginErrors>({})

  const [password, setPassword] = useState("")

  const [email, setEmail] = useState<string>(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("email") ?? ""
    return ""
  })

  if (typeof window !== "undefined") {
    localStorage.setItem("email", email)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formValues = { email, password }
    const result = loginFormValidationSchema.safeParse(formValues)

    if (!result.success) {
      const formattedErrors: LoginErrors = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginErrors
        formattedErrors[field] = issue.message
      })
      setError(formattedErrors)
      return
    }

    router.push("/")
    setError({})

    try {
      const response = await userLogin({ email, password })
      console.log("Login successful:", response.data)
      setEmail("")
      setPassword("")
      setError({})
    } catch (err) {
      console.error("Login failed")
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    handleSubmit,
  }
}
