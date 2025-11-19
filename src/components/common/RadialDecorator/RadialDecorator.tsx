"use client"
import { motion } from "framer-motion"

const RadialDecorator = () => {
  return (
    <section className="relative">
      <div className="absolute top-0">
        <motion.article
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: [1, 0.8, 1], opacity: 1, rotate: [0, 360] }}
          transition={{
            duration: 5,
            delay: 0,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="relative min-w-screen min-h-screen"
        >
          <div className="size-18 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute left-10 top-15 z-0"></div>
          <div className="size-50 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute left-20 top-55 z-0"></div>
          <div className="size-30 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-50 top-5 z-0"></div>
          <div className="size-10 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-0 top-35 z-0"></div>
          <div className="size-50 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute left-100 top-0 z-0"></div>
          <div className="size-15 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-70 top-85 z-0"></div>
          <div className="size-5 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-40 top-100 z-0"></div>
          <div className="size-5 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute left-60 top-13 z-0"></div>
          <div className="size-70 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-100 top-65 z-0"></div>
          <div className="size-35 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute left-80 top-90 z-0"></div>
          <div className="size-25 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-30 top-66 z-0"></div>
          <div className="size-45 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-55 bottom-20 z-0"></div>
          <div className="size-18 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-10 top-15 z-0"></div>
          <div className="size-18 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-10 top-100 z-0"></div>
          <div className="size-25 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute left-30 bottom-10 z-0"></div>
        </motion.article>
      </div>
      <div className="absolute top-0">
        <motion.article
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: [1, 0.5, 1], opacity: 0, rotate: [360, 0] }}
          transition={{
            duration: 8,
            delay: 0,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="relative min-w-screen min-h-screen"
        >
          <div className="size-18 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute left-10 top-15 z-0"></div>
          <div className="size-50 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute left-20 top-55 z-0"></div>
          <div className="size-30 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-50 top-5 z-0"></div>
          <div className="size-10 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-0 top-35 z-0"></div>
          <div className="size-50 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute left-100 top-0 z-0"></div>
          <div className="size-15 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-70 top-85 z-0"></div>
          <div className="size-5 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-40 top-100 z-0"></div>
          <div className="size-5 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute left-60 top-13 z-0"></div>
          <div className="size-70 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-100 top-65 z-0"></div>
          <div className="size-35 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute left-80 top-90 z-0"></div>
          <div className="size-25 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-30 top-66 z-0"></div>
          <div className="size-45 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-55 bottom-20 z-0"></div>
          <div className="size-18 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-10 top-15 z-0"></div>
          <div className="size-18 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute right-10 top-100 z-0"></div>
          <div className="size-25 rounded-full bg-radial-[at_50%_50%] from-[#e0e1d8] via-[#e5e7d6] to-[#448850] to-90% absolute left-30 bottom-10 z-0"></div>
        </motion.article>
      </div>
    </section>
  )
}

export default RadialDecorator
