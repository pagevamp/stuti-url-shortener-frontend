import { ChangeEvent, useState } from "react"
import { LoginErrors } from "../core/types/login-types"
import { loginFormValidationSchema } from "../core/validation/login-validation"
import { useRouter } from "next/navigation"
import { loginUser } from "../core/api/login-api"
import toast from "react-hot-toast"

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

    try {
      await loginUser(formValues)

      setFormData({
        email: "",
        password: "",
      })
      setError({})
      toast.success("Login successful")
      router.push("/")
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Login failed : ${err.message}`)
      } else {
        toast.error("Login failed : An unknown error occurred")
      }
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
