import { Icon } from "@iconify/react"

export interface InputProps {
  name: string
  labelName: string
  icon: string
  error?: string
  type?: string
  placeholder: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const InputField = ({
  labelName,
  name,
  type,
  icon,
  error,
  value,
  placeholder,
  onChange,
}: InputProps) => {
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
        value={value}
        onChange={onChange}
        className="flex h-12 w-full my-2 rounded-md border-2 border-[#2F2E43] shadow-md shadow-lime-950 bg-[#e0e1d8] text-[#2F2E43] font-light px-3 py-2 text-sm placeholder:text-[#716f91] placeholder:text-xs"
      />
      {error && (
        <p className="text-xs text-red-700 flex items-center gap-1 mt-1">
          <div className="w-fit">
            <Icon
              icon="solar:close-square-bold"
              width="14"
              height="14"
              className="text-red-700"
            />
          </div>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
