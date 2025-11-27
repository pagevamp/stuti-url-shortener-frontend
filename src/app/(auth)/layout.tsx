'use client';
import { ImageSlider } from '@/src/components/common/ImageSlider/ImageSlider';
import { RadialDecorator } from '@/src/components/common/RadialDecorator/RadialDecorator';
import React from 'react';
import '../colors.css';
import { Container } from '@/src/components/common/Container/Container';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <RadialDecorator />
      <Toaster position="top-right" />
      <section className="max-w-screen h-screen grid grid-cols-2 gap-10 mx-10 my-10 px-20 absolute top-0">
        <ImageSlider />
        <div className="bg-(--color-undraw-primary-100) h-[90%] rounded-3xl shadow-2xl shadow-lime-950 ">
          <Container>{children}</Container>
        </div>
      </section>
    </div>
  );
};

export default Layout;
