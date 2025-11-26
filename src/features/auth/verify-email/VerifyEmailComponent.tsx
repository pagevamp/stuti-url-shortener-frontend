"use client"
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const VerifyEmailComponent = () => {
  const router = useRouter()

  useEffect(() => {
    function redirectLogin() {
      router.push("/login")
    }
    setTimeout(redirectLogin, 6000)
  }, [])

  return (
    <motion.div
      className="place-items-center w-fit"
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: [1, 0.8, 1], opacity: 1 }}
      transition={{
        duration: 5,
        delay: 100,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <p className="text-primary-100 text-shadow-2xs text-shadow-undraw-secondary-100 font-extrabold text-4xl whitespace-nowrap">
        Your Email Has Been Verified!!!
      </p>
      <Icon
        icon="arcticons:hellochinese"
        className="text-black text-shadow-blue-500 font-extrabold"
        height={100}
        width={100}
      />
      <p className="text-md text-primary-100 text-shadow-3xs text-shadow-undraw-secondary-100 font-bold">
        You are now a proud user of our URL Shortener
      </p>
    </motion.div>
  )
}
