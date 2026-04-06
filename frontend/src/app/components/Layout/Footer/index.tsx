'use client'

import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Minimal footer - no links grid, reduced height */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          {/* Left side - copyright */}
          <p className="text-base md:text-lg">
            © {new Date().getFullYear()} Teeooh Solutions. All rights reserved.
          </p>

          {/* Right side - simple links (optional - remove if you want even smaller) 
          <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 text-sm md:text-base">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms & Conditions
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer