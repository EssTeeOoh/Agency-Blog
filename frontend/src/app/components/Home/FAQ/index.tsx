'use client'
import React from 'react'
import { Icon } from '@iconify/react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'

const FAQ = () => {
  return (
    <section
      id='FAQ'
      className='relative py-1 bg-cover bg-center overflow-hidden dark:bg-darkmode'
    >
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='relative rounded-2xl py-20 md:py-24 bg-faq-bg bg-no-repeat bg-cover bg-primary'>
          <p className='text-lg font-normal text-white text-center mb-6'>FAQ</p>
          <h2 className='text-white text-center max-w-3xl mx-auto'>
            Frequently asked questions.
          </h2>

          <div className='w-full px-4 pt-12 md:pt-16'>
            {/* Question 1 */}
            <div className='mx-auto w-full max-w-5xl rounded-2xl p-6 md:p-8 bg-white mb-5 shadow-sm'>
              <Disclosure>
                {({ open }) => (
                  <div> {/* ← Changed from <> to <div> */}
                    <DisclosureButton className='flex w-full justify-between items-center text-left text-xl md:text-2xl font-medium focus:outline-none hover:cursor-pointer'>
                      <span className='text-black'>
                        Can you design my site?
                      </span>
                      <div
                        className={`h-6 w-6 md:h-7 md:w-7 transform transition-transform duration-300 ${
                          open ? 'rotate-180' : ''
                        }`}
                      >
                        <Icon icon='lucide:chevron-up' width='24' height='24' />
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel className='text-base md:text-lg text-black/70 font-normal text-left pt-4 mt-4 border-t border-gray-200'>
                      <div className='lg:max-w-[70%]'>
                        Yes, absolutely! We specialize in custom web design that’s modern, responsive, and tailored to your brand. Whether you need a clean portfolio, an e-commerce store, a business site, or a full web application — we’ll create something that looks great and performs even better.
                      </div>
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            </div>

            {/* Question 2 */}
            <div className='mx-auto w-full max-w-5xl rounded-2xl p-6 md:p-8 bg-white mb-5 shadow-sm'>
              <Disclosure>
                {({ open }) => (
                  <div> {/* ← Changed from <> to <div> */}
                    <DisclosureButton className='flex w-full justify-between items-center text-left text-xl md:text-2xl font-medium focus:outline-none hover:cursor-pointer'>
                      <span className='text-black'>Can you code my site?</span>
                      <div
                        className={`h-6 w-6 md:h-7 md:w-7 transform transition-transform duration-300 ${
                          open ? 'rotate-180' : ''
                        }`}
                      >
                        <Icon icon='lucide:chevron-up' width='24' height='24' />
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel className='text-base md:text-lg text-black/70 pt-4 mt-4 font-normal text-left border-t border-gray-200'>
                      <div className='lg:max-w-[70%]'>
                        Yes — coding is at the core of what we do. We build fast, secure, and scalable websites using modern tools like Next.js, React, Tailwind CSS, Django, and more. We also handle full-stack development, API integrations, performance optimization, and ongoing maintenance so your site stays smooth and up-to-date.
                      </div>
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            </div>

            {/* Question 3 */}
            <div className='mx-auto w-full max-w-5xl rounded-2xl p-6 md:p-8 bg-white shadow-sm'>
              <Disclosure>
                {({ open }) => (
                  <div> {/* ← Changed from <> to <div> */}
                    <DisclosureButton className='flex w-full justify-between items-center text-left text-xl md:text-2xl font-medium focus:outline-none hover:cursor-pointer'>
                      <span className='text-black'>Where are you located?</span>
                      <div
                        className={`h-6 w-6 md:h-7 md:w-7 transform transition-transform duration-300 ${
                          open ? 'rotate-180' : ''
                        }`}
                      >
                        <Icon icon='lucide:chevron-up' width='24' height='24' />
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel className='text-base md:text-lg text-black/70 pt-4 mt-4 font-normal text-left border-t border-gray-200'>
                      <div className='lg:max-w-[70%]'>
                        We’re proudly based in Lagos, Nigeria, but we work remotely with clients from all over the world. Whether you're in Africa, Europe, North America, or anywhere else — we deliver the same high-quality work, clear communication, and fast turnaround.
                      </div>
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ