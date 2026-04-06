'use client'
import React from 'react'
import Image from 'next/image'

const Dedicated = () => {
  return (
    <section className='relative bg-cover bg-center overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-5'>
          <Image
            src='/images/dedicated/spiral.svg'
            height={272}
            width={686}
            alt='spiral-design'
            className='absolute left-0 top-0 hidden lg:block -z-10'
          />

          {/* Left Column - Image with rounded corners */}
          <div className='col-span-12 lg:col-span-6 justify-self-center'>
            <Image
              src='/images/dedicated/man.svg'
              alt='Samuel Olu'
              width={416}
              height={530}
              className='mx-auto md:mx-0 rounded-3xl object-cover' // ← rounded corners added
            />
          </div>

          {/* Right Column */}
          <div className='col-span-12 lg:col-span-6'>
            <div className='relative'>
              <Image
                src='/images/dedicated/comma.svg'
                alt='comma-image'
                width={200}
                height={106}
                className='absolute -top-16 -left-32 hidden lg:block'
              />
            </div>

            <h2 className='text-center -mr-1 lg:text-start lg:leading-20 leading-14'>
              “Building digital experiences people love.”
            </h2>

            <p className='text-xl font-medium text-black/55 mt-5 text-center lg:text-start'>
              At Teeooh Solutions, we’re passionate about turning ideas into clean, fast, and user-friendly websites.  
              Whether it’s a business site, portfolio, or full web application — we help individuals and brands get online with clarity and confidence.
            </p>

            <h5 className='mt-12 lg:pl-32 relative lg:before:block before:hidden before:absolute before:bg-black before:h-0.5 before:w-24 before:left-0 before:bottom-1/2 text-center lg:text-start'>
              Samuel Olu
            </h5>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dedicated