'use client'

import React, { useState } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share'
import { Button } from '@material-tailwind/react'

interface ShareButtonProps {
  url: string
  title: string
  description?: string
}

export default function ShareButton({ url, title, description }: ShareButtonProps) {
  const [showPopup, setShowPopup] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
    setShowPopup(false)
  }

  return (
    <div className="relative inline-block">
      <Button
        color="gray"
        variant="text"
        size="sm"
        className="flex items-center gap-2 normal-case"
        onClick={() => setShowPopup(!showPopup)}
        placeholder=""
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Share
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      </Button>

      {showPopup && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 p-4 border border-gray-200">
          <div className="flex flex-col gap-3">
            <TwitterShareButton url={url} title={title}>
              <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
                <TwitterIcon size={32} round />
                <span>Share on X (Twitter)</span>
              </div>
            </TwitterShareButton>

            {/* quote prop removed — no longer supported in react-share v5 */}
            <FacebookShareButton url={url}>
              <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
                <FacebookIcon size={32} round />
                <span>Share on Facebook</span>
              </div>
            </FacebookShareButton>

            <LinkedinShareButton url={url} title={title} summary={description}>
              <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
                <LinkedinIcon size={32} round />
                <span>Share on LinkedIn</span>
              </div>
            </LinkedinShareButton>

            <WhatsappShareButton url={url} title={title}>
              <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer">
                <WhatsappIcon size={32} round />
                <span>Share on WhatsApp</span>
              </div>
            </WhatsappShareButton>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded cursor-pointer w-full text-left"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468.941.585.636 1.39 1.094 2.347 1.094 5.201 0 9.375-3.694 9.375-8.25z" />
                </svg>
              </div>
              <span>Copy link</span>
            </button>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}