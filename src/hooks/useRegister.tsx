import { useState } from "react"
import { registerFormValidationSchema } from "../components/register/validation"
import { RegisterErrors } from "../components/register/types"
import { userRegister } from "../components/register/api"

export function useRegister() {
  const [email, setEmail] = useState<string>(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("email") ?? ""
    return ""
  })
  const [username, setUsername] = useState<string>(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("username") ?? ""
    return ""
  })
  const [fullName, setFullName] = useState<string>(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("fullName") ?? ""
    return ""
  })
  const [password, setPassword] = useState<string>("")

  const [error, setError] = useState<RegisterErrors>({})

  if (typeof window !== "undefined") {
    localStorage.setItem("email", email)
    localStorage.setItem("username", username)
    localStorage.setItem("fullName", fullName)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formValues = { fullName, username, email, password }
    const result = registerFormValidationSchema.safeParse(formValues)

    if (!result.success) {
      const formattedErrors: RegisterErrors = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterErrors
        formattedErrors[field] = issue.message
      })
      setError(formattedErrors)
      return
    }

    setError({})

    try {
      const response = await userRegister(formValues)
      console.log("Register successful:", response.data)

      setEmail("")
      setUsername("")
      setFullName("")
      setPassword("")
      setError({})
    } catch (err) {
      console.error("Register failed")
    }
  }

  return {
    email,
    setEmail,
    username,
    setUsername,
    fullName,
    setFullName,
    password,
    setPassword,
    error,
    setError,
    handleSubmit,
  }
}
