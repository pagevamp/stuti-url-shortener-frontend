import { Icon } from "@iconify/react"

export const InputField = ({
  labelName,
  name,
  type,
  icon,
  placeholder,
}: {
  name: string
  labelName: string
  icon: string
  type?: string
  placeholder: string
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-shadow-md text-shadow-lime-950 flex flex-row gap-2 items-center text-primary-100"
      >
        <Icon
          icon={icon}
          width={16}
          height={16}
          className="text-undraw-secondary-100"
        />
        {labelName}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="flex h-12 w-full my-2 rounded-md border-2 border-undraw-secondary-100 shadow-md shadow-lime-950 bg-primary-100 text-undraw-secondary-100 font-light px-3 py-2 text-sm placeholder:text-placeholder-100 placeholder:text-xs"
      />
    </div>
  )
}
