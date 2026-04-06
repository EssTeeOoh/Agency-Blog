'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react/dist/iconify.js'

const Hero = () => {
  const leftAnimation = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.6 },
  }

  const rightAnimation = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: { duration: 0.6 },
  }

  // Function to scroll to Join us section
  const scrollToJoin = () => {
    const joinSection = document.getElementById('Join')
    if (joinSection) {
      joinSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      })
    }
  }

  return (
    <section className='relative overflow-hidden z-1'>
      <div className='container mx-auto pt-24 max-w-7xl px-4'>
        <div className='grid grid-cols-12 justify-center items-center'>
          <div className='col-span-12 xl:col-span-5 lg:col-span-6 md:col-span-12 sm:col-span-12'>
            <div className='py-2 px-5 bg-primary/15 rounded-full w-fit'>
              <p className='text-primary text-lg font-bold'>DESIGN AGENCY</p>
            </div>
            <h1>
              Dedicated to bring your ideas to life.
            </h1>
            
            {/* Get Started button – now scrolls to Join section */}
            <button 
              onClick={scrollToJoin}
              className='bg-primary text-white text-xl font-semibold py-5 px-12 rounded-full hover:bg-darkmode hover:cursor-pointer mt-10 transition-colors duration-300'
            >
              Get started
            </button>
          </div>

          <div className='xl:col-span-7 lg:col-span-6 lg:block hidden'>
            <Image
              src='/images/hero/banner-image.png'
              alt='banner image'
              width={600}
              height={600}
              className='w-full'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
