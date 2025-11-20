"use client"
import { InputField } from "../common/InputField/InputField"
import { Button } from "../common/Button/Button"
import { Icon } from "@iconify/react"

export const LoginComponent = () => {
  return (
    <form className="flex flex-col my-5 mx-auto w-[85%] gap-3 place-content-center">
      <p className="text-2xl font-extrabold text-shadow-2xs text-shadow-[#2F2E43]">
        LOG IN
      </p>
      <InputField
        name="username"
        type="text"
        icon="akar-icons:person"
        placeholder="Enter your username"
        labelName="User Name"
      />
      <InputField
        name="password"
        type="text"
        icon="tdesign:user-password"
        placeholder="Enter  password"
        labelName="Password"
      />

      <span className="flex flex-row items-center gap-1 mx-auto text-gray-400 text-sm my-5">
        Forgot Password?
      </span>
      
      <Button>
        <span className="flex flex-row items-center gap-1">
          Log In <Icon icon="pepicons-print:enter" width={16} height={16} />
        </span>
      </Button>
    </form>
  )
}
