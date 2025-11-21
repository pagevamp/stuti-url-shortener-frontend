import { ChangeEvent, useState } from "react"
import { LoginErrors } from "../core/types/login-types"
import { loginFormValidationSchema } from "../core/validation/login-validation"
import { useRouter } from "next/navigation"
import { userLogin } from "../core/api/login-api"

export function useLogin() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState<LoginErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formValues = formData
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
    setError({})
    router.push("/")

    try {
      const response = await userLogin(formValues)
      console.log("Login successful:", response.data)

      setFormData({
        email: formData.email,
        password: formData.password,
      })
      setError({})
    } catch (err) {
      console.error("Login failed")
    }
  }

  return {
    error,
    setError,
    formData,
    setFormData,
    handleSubmit,
    handleChange,
  }
}
