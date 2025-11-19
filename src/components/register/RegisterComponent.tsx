"use client"
import InputFields from "../common/InputFields/InputFields"
import Button from "../common/Button/Button"

const RegisterComponent = () => {
  return (
    <div className="flex flex-col my-5 mx-auto w-[85%] gap-3 place-content-center">
      <p className="text-2xl font-extrabold text-shadow-2xs text-shadow-[#2F2E43]">
        SIGN UP
      </p>

      <InputFields
        type="text"
        placeholder="Enter your name"
        labelName="Full Name"
      />

      <InputFields
        type="text"
        placeholder="Enter your username"
        labelName="User Name"
      />

      <InputFields
        type="text"
        placeholder="Enter your email"
        labelName="Email"
      />
      <InputFields
        type="text"
        placeholder="Enter  password"
        labelName="Password"
      />
      <Button>Sign Up</Button>
    </div>
  )
}

export default RegisterComponent
