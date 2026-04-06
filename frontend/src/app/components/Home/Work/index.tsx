'use client'
import React from 'react'
import Image from 'next/image'

const teamMembers = [
  {
    name: "Mfon",
    profession: "Data Engineer",
    imgSrc: "/images/wework/Mfon.svg",
  },
  {
    name: "Daniel",
    profession: "Frontend Engineer",
    imgSrc: "/images/wework/Daniel.svg",
  },
  {
    name: "Olu",
    profession: "Backend Engineer",
    imgSrc: "/images/wework/man.svg",
  },
  {
    name: "Sarah",
    profession: "UI/UX Designer",
    imgSrc: "/images/wework/sarah.svg",
  },
]

const allMembers = [...teamMembers, ...teamMembers, ...teamMembers]

const Work = () => {
  return (
    <section
      id='Team'
      className="relative dark:bg-darkmode py-4 bg-cover bg-center overflow-hidden before:absolute before:w-full before:h-full before:bg-[url('/images/wework/elipse.svg')] before:bg-no-repeat before:bg-center after:absolute after:w-1/3 after:h-1/3 after:bg-[url('/images/wework/vector.svg')] after:bg-no-repeat after:top-28 after:-right-12 after:-z-10"
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .team-marquee {
          display: flex;
          width: max-content;
          animation: marquee 32s linear infinite;
          will-change: transform;
        }
        .team-marquee:hover {
          animation-play-state: paused;
        }

        /* Squircle — taller than wide so the full face + shoulders fit */
        .squircle {
          border-radius: 38%;
          overflow: hidden;
          position: relative;
        }

        /* Pin the image to the top so the face is never clipped */
        .squircle img {
          object-fit: cover;
          object-position: top center;
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>

      <div className='container mx-auto max-w-7xl px-4'>
        <div className='text-center overflow-hidden'>
          <h3 className='text-black dark:text-white my-5'>
            We work in several verticals.
          </h3>
        </div>
      </div>

      <div className='overflow-hidden w-full'>
        <div className='team-marquee py-6'>
          {allMembers.map((member, i) => (
            <div
              key={i}
              className='flex-shrink-0 w-64 sm:w-72 md:w-80 mx-3'
            >
              <div className='bg-white dark:bg-darkHeroBg py-10 px-6 my-4 text-center shadow-xl rounded-3xl relative'>

                {/* Squircle — wider and taller to avoid any face crop */}
                <div className='relative mx-auto' style={{ width: 170, height: 190 }}>
                  <div
                    className='squircle w-full h-full bg-gray-100 dark:bg-gray-700'
                  >
                    <Image
                      src={member.imgSrc}
                      alt={`${member.name} - ${member.profession}`}
                      width={170}
                      height={190}
                      className='object-cover object-top w-full h-full'
                    />
                  </div>

                  {/* LinkedIn badge */}
                  <div className='absolute -right-2 -bottom-2 bg-white dark:bg-darkHeroBg shadow-md p-2.5 rounded-full z-10'>
                    <Image
                      src='/images/wework/linkedin.svg'
                      alt='linkedin'
                      width={22}
                      height={22}
                      className='inline-block'
                    />
                  </div>
                </div>

                <h6 className='text-xl text-black dark:text-white font-bold pt-6'>
                  {member.name}
                </h6>
                <p className='text-base dark:text-white font-normal pt-2 pb-1'>
                  {member.profession}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work