'use client'
import React from 'react'
import Link from 'next/link'

const Beliefs = () => {
  return (
    <section className='bg-cover bg-center overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          {/* COLUMN-1 */}

          <div className="bg-purple pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl bg-[url('/images/beliefs/swirls.svg')] bg-no-repeat bg-right-bottom">
            <p className='text-lg font-normal text-white tracking-widest mb-5 text-center sm:text-start uppercase'>
              beliefs
            </p>
            <h3 className='text-white mb-5 text-center sm:text-start'>
              Honesty{' '}
              <span className='text-white/60'>
                and hard work are our beliefs.
              </span>
            </h3>
            <p className='text-lg text-white/75 pt-2 mb-16 text-center sm:text-start'>
              We believe in doing things right the first time — no shortcuts, no fluff.  
              Every project is built with integrity, clear communication, and genuine care for the people we work with.  
              We show up, we listen, and we deliver.
            </p>
            
          </div>

          {/* COLUMN-2 */}
          <div className=''>
            <div className="bg-[#D6FFEB] pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl bg-[url('/images/beliefs/bg.svg')] bg-no-repeat bg-bottom">
              <p className='text-lg font-normal text-primary tracking-widest mb-5 text-center sm:text-start uppercase'>
                BUILD
              </p>
              <h3 className='text-black mb-5 text-center sm:text-start'>
                <span className='text-primary'>Build</span> that great idea that
                you have.
              </h3>
              <p className='pt-2 mb-16 text-center sm:text-start text-black/75 text-lg'>
                Got a vision? We turn it into reality.  
                From the first sketch to the final launch, we help you create websites, apps, and digital tools that actually work beautifully and reliably.  
                Your idea deserves to be built right.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Beliefs
