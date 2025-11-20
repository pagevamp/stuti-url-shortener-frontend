import { ImageSlider } from "@/src/components/common/ImageSlider/ImageSlider"
import { RadialDecorator } from "@/src/components/common/RadialDecorator/RadialDecorator"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <RadialDecorator />
      <section className="max-w-screen h-screen grid grid-cols-2 gap-10 mx-10 my-10 px-20 absolute top-0">
        <ImageSlider />
        <div className="bg-[#448850] rounded-3xl shadow-2xl shadow-lime-950 ">
          <div>{children}</div>
        </div>
      </section>
    </div>
  )
}

export default Layout
