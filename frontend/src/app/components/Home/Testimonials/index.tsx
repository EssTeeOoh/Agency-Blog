'use client'
import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { Icon } from '@iconify/react'

interface TestimonialType {
  name: string
  profession: string
  comment: string
  imgSrc: string
  rating: number
}

const testimonialData: TestimonialType[] = [
  {
    name: 'Aisha Adebayo',
    profession: 'CEO, Company',
    comment: 'This is an amazing service! Highly recommend to anyone looking for quality and reliability.',
    imgSrc: '/images/testimonials/person1.svg',
    rating: 5,
  },
  {
    name: 'Chinedu Okeke',
    profession: 'Product Manager',
    comment: 'Fantastic experience from start to finish. The team was professional and responsive.',
    imgSrc: '/images/testimonials/person2.svg',
    rating: 4,
  },
  {
    name: 'Fatima Bello',
    profession: 'Marketing Director',
    comment: 'Exceeded all my expectations. I would definitely use this service again.',
    imgSrc: '/images/testimonials/person3.svg',
    rating: 5,
  },
]

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 2,
  arrows: false,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 2000,
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
}

const TestimonialCard: React.FC<{ items: TestimonialType }> = ({ items }) => {
  const validRating = Math.min(Math.max(items.rating, 0), 5)

  return (
    <div className='relative py-10'>
      <div className='bg-white dark:bg-darkHeroBg shadow-testimonial m-3 p-10 rounded-3xl'>
        <Image
          src={items.imgSrc}
          alt={`${items.name} - ${items.profession} testimonial image`}
          width={71}
          height={71}
          className='absolute top-3 rounded-full w-[71px] h-[71px] object-cover'
        />
        <p className='text-base font-medium my-4 text-black'>{items.comment}</p>
        <hr style={{ color: 'border' }} />
        <div className='flex justify-between'>
          <div>
            <p className='text-base font-medium pt-4 pb-2 text-black dark:text-white'>
              {items.name}
            </p>
            <p className='text-xs font-medium pb-2 text-black/50'>
              {items.profession}
            </p>
          </div>
          <div className='flex mt-5'>
            {Array.from({ length: 5 }, (_, i) => (
              <Icon
                key={i}
                icon='twemoji:star'
                width='18'
                className={`mr-1 ${
                  i < validRating ? 'text-yellow-500' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Testimonial: React.FC = () => {
  return (
    <section
      className="bg-testimonial dark:bg-darkmode bg-cover bg-center overflow-hidden before:absolute before:w-full before:h-full before:bg-[url('/images/wework/elipse.svg')] before:bg-no-repeat before:bg-center"
      id='testimonial-section'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='text-center'>
          <h2 className='my-3'>See what others are saying.</h2>
        </div>
        <div className='mt-20'>
          <Slider {...settings}>
            {testimonialData.map((items, i) => (
              <TestimonialCard key={i} items={items} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Testimonial