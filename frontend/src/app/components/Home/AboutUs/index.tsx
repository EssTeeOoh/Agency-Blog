'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'

const Aboutus = () => {
  // Static data — no fetch needed
  const aboutItems = [
    {
      heading: "About Us",
      imgSrc: "/images/aboutus/imgOne.svg",
      paragraph:
        "Teeooh Solutions is a passionate web development agency focused on turning ideas into fast, modern, and user-friendly digital experiences. We build websites and applications that help businesses grow, connect, and succeed online.",
      //link: "Learn More",           
      //href: "#",                    
    },
    {
      heading: "Our Services",
      imgSrc: "/images/aboutus/imgTwo.svg",
      paragraph:
        "We offer full-cycle web development, ongoing website maintenance, performance optimization, quality assurance (QA) testing, and technical support. From new builds to fixing existing platforms — we keep your digital presence strong, secure, and up-to-date.",
      //link: "Explore Services",     
      //href: "#",                    
    },
    {
      heading: "Our Works",
      imgSrc: "/images/aboutus/imgThree.svg",
      paragraph:
        "We've proudly delivered projects like CorpsConnect — a powerful app connecting communities — and performed detailed QA testing for platforms like MyBudi and others. Every project is built with care, speed, and real-world usability in mind.",
      link: "View Portfolio",
      href: "https://teeooh.pythonanywhere.com/#portfolio",  
    },
  ]

  return (
    <section id="About" className="bg-cover bg-center overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 relative z-1">
        <div className="p-12 bg-grey rounded-3xl">
          <Image
            src="/images/aboutus/dots.svg"
            width={100}
            height={100}
            alt="dots-image"
            className="absolute bottom-1 -left-20"
          />
          <p className="text-center text-primary text-lg tracking-widest uppercase mt-10">
            About Us
          </p>
          <h2 className="text-center pb-12">Know more about us.</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-10">
            {aboutItems.map((item, i) => (
              <div
                key={i}
                className="hover:bg-darkmode bg-white rounded-3xl p-8 shadow-xl group transition-all duration-300"
              >
                <h5 className="group-hover:text-white mb-5 text-xl md:text-2xl font-bold">
                  {item.heading}
                </h5>

                <Image
                  src={item.imgSrc}
                  alt={item.heading}
                  width={100}
                  height={100}
                  className="mb-5"
                />

                <p className="text-lg font-normal text-black group-hover:text-white mb-6 leading-relaxed">
                  {item.paragraph}
                </p>

                {/* Conditional rendering: only "Our Works" is a real link */}
                {item.heading === "Our Works" ? (
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-primary hover:text-white transition-colors flex items-center group-hover:underline"
                  >
                    {item.link}
                    <Icon icon="tabler:chevron-right" width={24} height={24} className="ml-2" />
                  </Link>
                ) : (
                  <div className="text-lg font-semibold text-primary/70 flex items-center">
                    {item.link}
                    <Icon icon="tabler:chevron-right" width={24} height={24} className="ml-2 opacity-50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Aboutus