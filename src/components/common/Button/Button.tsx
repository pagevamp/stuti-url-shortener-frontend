const Button = ({ children, type }: { children: string; type?: string }) => {
  return (
    <button  className="bg-[#2F2E43] border-2 border-cyan-800 text-white border-l rounded-3xl px-4 py-2 h-14">
      {children}
    </button>
  )
}

export default Button
