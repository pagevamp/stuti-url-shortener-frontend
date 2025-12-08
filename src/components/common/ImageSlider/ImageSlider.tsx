'use client';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

const slide = [
  { image: '/login.svg', alt: 'login' },
  { image: '/enter.svg', alt: 'entry' },
  { image: '/welcome.svg', alt: 'welcome' },
  { image: '/join.svg', alt: 'join' },
];

export const ImageSlider = () => {
  return (
    <motion.div
      className="w-full max-w-[600px] min-w-[300px] h-[800px] min-h-[500px] lg:h-[90vh] 2xl:h-[80vh] rounded-[20px] overflow-hidden hidden lg:block"
      initial={{ x: -50, opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {slide.map((slide) => (
          <SwiperSlide key={slide.alt}>
            <div className="w-full h-full">
              <Image
                width={500}
                height={950}
                src={slide.image}
                alt={slide.alt}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};
