import InputFields from "../common/InputFields/InputFields"
import Button from "../common/Button/Button"

const LoginComponent = () => {
  return (
    <div className="flex flex-col my-5 mx-auto w-[85%] gap-12 place-content-center">
      <p className="text-2xl font-extrabold text-shadow-2xs text-shadow-[#2F2E43]">
        LOG IN
      </p>
      <InputFields
        name="User Name"
        type="text"
        placeholder="Enter your username"
        labelName="User Name"
      />
      <InputFields
        name="Password"
        type="text"
        placeholder="Enter  password"
        labelName="Password"
      />
      <Button>Log In</Button>
    </div>
  )
}

export default LoginComponent
