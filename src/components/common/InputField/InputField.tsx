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
        className="text-shadow-md text-shadow-lime-950 flex flex-row gap-2 items-center"
      >
        <Icon icon={icon} width={16} height={16} className="text-[#2F2E43]" />
        {labelName}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="flex h-12 w-full my-2 rounded-md border-2 border-[#2F2E43] shadow-md shadow-lime-950 bg-[#e0e1d8] text-[#2F2E43] font-light px-3 py-2 text-sm placeholder:text-[#716f91] placeholder:text-xs"
      />
    </div>
  )
}
