"use client"
import { InputField } from "../../../components/common/InputField/InputField"
import { Button } from "../../../components/common/Button/Button"
import { Icon } from "@iconify/react"

export const RegisterComponent = () => {
  return (
    <form className="flex flex-col my-5 mx-auto w-[85%] gap-3 place-content-center">
      <p className="text-2xl font-extrabold text-shadow-(--color-undraw-secondary-100)">
        SIGN UP
      </p>

      <InputField
        name="fullname"
        type="text"
        icon="mdi:rename-outline"
        placeholder="Enter your name"
        labelName="Full Name"
      />

      <InputField
        name="username"
        type="text"
        icon="akar-icons:person"
        placeholder="Enter your username"
        labelName="User Name"
      />

      <InputField
        name="email"
        type="email"
        icon="ic:outline-email"
        placeholder="Enter your email"
        labelName="Email"
      />
      <InputField
        name="password"
        type="password"
        icon="tdesign:user-password"
        placeholder="Enter  password"
        labelName="Password"
      />
      <Button>
        <span className="flex flex-row items-center gap-1">
          Sign Up <Icon icon="icomoon-free:enter" width={16} height={16} />
        </span>
      </Button>

      <span className="flex flex-row items-center gap-1 mx-auto text-gray-400 text-sm my-5">
        Sign up with your <Icon icon="logos:google" /> account instead
      </span>
    </form>
  )
}
