'use client'

import Image from 'next/image'
import Link from 'next/link'

const Insta = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-10">
        {/* TikTok Post 1 */}
        <div className="relative group mx-auto overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/images/insta/insta1.png" // ← change to your real TikTok thumbnails later
            width={306}
            height={306}
            alt="TikTok 1"
            className="w-full h-full object-cover"
          />

          {/* Sliding Overlay with TikTok icon */}
          <Link 
            href="https://www.tiktok.com/@teeooh01" // ← CHANGE TO YOUR REAL TIKTOK
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-center">
              <Image
                src="/images/insta/tiktok.svg" // ← add TikTok icon to public/images/insta/tiktok.svg
                alt="TikTok"
                width={48}
                height={48}
                className="cursor-pointer"
              />
            </div>
          </Link>
        </div>

        {/* TikTok Post 2 */}
        <div className="relative group mx-auto overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/images/insta/insta2.png"
            width={306}
            height={306}
            alt="TikTok 2"
            className="w-full h-full object-cover"
          />

          <Link 
            href="https://www.tiktok.com/@teeooh01"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-center">
              <Image
                src="/images/insta/tiktok.svg"
                alt="TikTok"
                width={48}
                height={48}
                className="cursor-pointer"
              />
            </div>
          </Link>
        </div>

        {/* TikTok Post 3 */}
        <div className="relative group mx-auto overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/images/insta/insta3.png"
            width={306}
            height={306}
            alt="TikTok 3"
            className="w-full h-full object-cover"
          />

          <Link 
            href="https://www.tiktok.com/@teeooh01"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-center">
              <Image
                src="/images/insta/tiktok.svg"
                alt="TikTok"
                width={48}
                height={48}
                className="cursor-pointer"
              />
            </div>
          </Link>
        </div>

        {/* TikTok Post 4 */}
        <div className="relative group mx-auto overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <Image
            src="/images/insta/insta4.png"
            width={306}
            height={306}
            alt="TikTok 4"
            className="w-full h-full object-cover"
          />

          <Link 
            href="https://www.tiktok.com/@teeooh01"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-center">
              <Image
                src="/images/insta/tiktok.svg"
                alt="TikTok"
                width={48}
                height={48}
                className="cursor-pointer"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Insta
