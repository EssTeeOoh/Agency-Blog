'use client'
import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'

const Manage = () => {
  const [enabled, setEnabled] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'yearly' | 'monthly'>('yearly')

  const toggleEnabled = () => {
    setEnabled((prev) => !prev)
    setSelectedCategory((prev) => (prev === 'yearly' ? 'monthly' : 'yearly'))
  }

  // Pricing plans with different benefits for Monthly vs Yearly
  const plans = [
    {
      heading: "Starter",
      price: { monthly: 49, yearly: 450 },
      user: "Perfect for individuals & small projects",
      features: {
        monthly: [
          "1 website",
          "Basic maintenance",
          "Email support (72h response)",
          "Standard QA testing",
          "Mobile responsive design",
        ],
        yearly: [
          "1 website",
          "Full maintenance & updates",
          "Priority email support (24h)",
          "Standard QA testing",
          "Mobile responsive design",
          "Free SSL certificate",
        ],
      },
    },
    {
      heading: "Professional",
      price: { monthly: 129, yearly: 1200 },
      user: "Best for growing businesses & startups",
      features: {
        monthly: [
          "Up to 2 websites",
          "Basic maintenance",
          "Priority support (48h)",
          "Advanced QA testing",
          "SEO basics",
        ],
        yearly: [
          "Up to 5 websites",
          "Full maintenance & monthly updates",
          "Priority support (24h)",
          "Advanced QA & performance testing",
          "SEO optimization",
          "Custom integrations",
          "Monthly performance reports",
        ],
      },
    },
    {
      heading: "Enterprise",
      price: { monthly: 299, yearly: 2880 },
      user: "For teams & high-traffic projects",
      features: {
        monthly: [
          "Up to 5 websites",
          "Dedicated maintenance",
          "24/7 priority support",
          "Comprehensive QA",
          "Custom development",
        ],
        yearly: [
          "Up to 10 websites",
          "Dedicated maintenance team",
          "24/7 priority support",
          "Comprehensive QA & security audits",
          "Custom development & features",
          "Advanced API integrations",
          "Real-time performance monitoring",
          "Dedicated account manager",
        ],
      },
    },
  ]

  const currentPlans = plans.map((plan) => ({
    ...plan,
    price: plan.price[selectedCategory],
    currentFeatures: plan.features[selectedCategory],
  }))

  return (
    <section id='services-section'>
      <div className='container mx-auto max-w-7xl px-4'>
        <h2 className='text-center'>
          Manage All Your Social Media Profiles From One Place.
        </h2>

        {/* Perks */}
        <div className='flex sm:block'>
          <div className='flex flex-col sm:flex-row gap-5 md:justify-evenly mt-20 items-start mx-auto'>
            <div className='flex gap-5 items-center justify-center md:justify-start'>
              <Image src='/images/manage/right.svg' alt='right-icon' width={21} height={14} />
              <p className='text-lg font-semibold'>Free 15-day trial</p>
            </div>
            <div className='flex gap-5 items-center justify-center md:justify-start'>
              <Image src='/images/manage/right.svg' alt='right-icon' width={21} height={14} />
              <p className='text-lg font-semibold'>Unlimited Team Members</p>
            </div>
            <div className='flex gap-5 items-center justify-center md:justify-start'>
              <Image src='/images/manage/right.svg' alt='right-icon' width={21} height={14} />
              <p className='text-lg font-semibold'>Cancel Anytime</p>
            </div>
          </div>
        </div>

        {/* Toggle Switch */}
        <div className='mt-6 relative'>
          <div className='dance-text xl:-ml-80 lg:-ml-80 md:-ml-80 -ml-52 text-center -rotate-[10deg] mb-5'>
            get 3 months free
          </div>
          <Image
            src='/images/manage/toggle.svg'
            alt='toggle-image'
            width={24}
            height={24}
            className='absolute left-[37%] top-8'
          />
          <div className='flex items-center justify-center'>
            <p className='text-sm font-medium mr-5'>Billed Yearly</p>
            <Switch
              checked={enabled}
              onChange={toggleEnabled}
              className='relative inline-flex h-6 w-11 items-center rounded-full bg-black'
            >
              <span className='sr-only'>Toggle billing period</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </Switch>
            <p className='text-sm font-medium ml-5'>Billed Monthly</p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-10 md:gap-14 manage'>
          {currentPlans.map((plan, i) => (
            <div
              key={i}
              className='shadow-manage-shadow border border-border text-center p-8 md:p-10 rounded-3xl'
            >
              <h5 className='mb-3 text-2xl md:text-3xl font-bold'>{plan.heading}</h5>
              
              <p className='text-5xl md:text-6xl font-extrabold mb-3'>
                ${plan.price}
                <span className='text-2xl md:text-3xl font-medium'>
                  /{selectedCategory === 'yearly' ? 'yr' : 'mo'}
                </span>
              </p>

              <p className='text-sm md:text-base font-medium mb-8 text-gray-600'>
                {plan.user}
              </p>

              {/* Features */}
              <div className='space-y-3 md:space-y-4 text-left mb-10'>
                {plan.currentFeatures.map((feature: string, index: number) => (
                  <p key={index} className='text-sm md:text-base font-medium text-darkgrey flex items-start gap-2'>
                    <span className='text-green-500 mt-1'>✓</span>
                    {feature}
                  </p>
                ))}
              </div>

              {/* Button now redirects to newsletter section */}
              <Link href="/#Join" className="block">
                <button className='w-full text-sm md:text-base font-bold text-primary bg-transparent hover:bg-primary hover:text-white border-2 border-primary rounded-full py-4 px-12 hover:cursor-pointer transition-colors'>
                  Start My 15-day Trial
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Manage