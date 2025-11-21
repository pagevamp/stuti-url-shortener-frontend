import { ChangeEvent, useState } from "react"
import { registerFormValidationSchema } from "../core/validation/register-validation"
import { RegisterErrors } from "../core/types/register-types"
import { userRegister } from "../core/api/register-api"

export function useRegister() {
  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState<RegisterErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setRegisterFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formValues = registerFormData
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

      setRegisterFormData({
        username: registerFormData.username,
        fullName: registerFormData.fullName,
        email: registerFormData.email,
        password: registerFormData.password,
      })
      setError({})
    } catch (err) {
      console.error("Register failed")
    }
  }

  return {
    error,
    setError,
    registerFormData,
    setRegisterFormData,
    handleChange,
    handleSubmit,
  }
}
