import React from "react"

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="flex flex-col gap-5 py-10 px-20">{children}</article>
  )
}
