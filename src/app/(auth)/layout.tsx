import { ImageSlider } from "@/src/components/common/ImageSlider/ImageSlider"
import { RadialDecorator } from "@/src/components/common/RadialDecorator/RadialDecorator"
import React from "react"
import "../colors.css"
import { Container } from "@/src/components/common/Container/Container"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <RadialDecorator />
      <section className="max-w-screen h-screen grid grid-cols-2 gap-10 mx-10 my-10 px-20 absolute top-0">
        <section className="hidden lg:block">
          {" "}
          <ImageSlider />
        </section>
        <div className="bg-(--color-undraw-primary-100) h-[90%] rounded-3xl shadow-2xl shadow-lime-950 md:w-[600px] sm:min-w-[400px] xs:min-w-[200px]">
          <Container>{children}</Container>
        </div>
      </section>
    </div>
  )
}

export default Layout
