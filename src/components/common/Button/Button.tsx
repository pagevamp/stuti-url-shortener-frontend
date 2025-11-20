export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="bg-[#2F2E43] border-2 border-cyan-800 text-white border-l rounded-3xl px-10 py-2 w-40 h-14 mx-auto">
      {children}
    </button>
  )
}
