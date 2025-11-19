import React from "react"

const InputFields = ({
  labelName,
  name,
  type,
  placeholder,
}: {
  name?: string
  labelName?: string
  type?: string
  placeholder?: string
}) => {
  return (
    <div>
      <label htmlFor={name} className="text-shadow-md text-shadow-lime-950">
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

export default InputFields
