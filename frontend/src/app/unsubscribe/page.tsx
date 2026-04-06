'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button, Typography } from '@material-tailwind/react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Processing your request...')

  useEffect(() => {
    const email = searchParams.get('email')

    if (!email) {
      setStatus('error')
      setMessage("We couldn't process your request — no email was provided.")
      return
    }

    async function processUnsubscribe() {
      try {
        const response = await fetch(`${API_URL}/api/unsubscribe/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus('success')
          setMessage(
            "We hate to see you go... 💔\n\n" +
            "You've been successfully unsubscribed. You'll no longer receive emails from us."
          )
        } else {
          setStatus('error')
          setMessage(data.error || "Something went wrong while processing your request.")
        }
      } catch {
        setStatus('error')
        setMessage("We couldn't reach our server. Please try again later or contact us directly.")
      }
    }

    processUnsubscribe()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center">

        {/* Loading */}
        {status === 'loading' && (
          <div className="space-y-6">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <Typography variant="h5" color="blue-gray">
              Processing your unsubscribe request...
            </Typography>
          </div>
        )}

        {/* Success */}
        {status === 'success' && (
          <div className="space-y-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-14 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <Typography variant="h3" color="blue-gray" className="font-bold">
              You've been unsubscribed
            </Typography>
            <Typography className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
              {message}
            </Typography>
            <div className="pt-6">
              <Link href="/">
                <Button color="blue" size="lg" className="rounded-full px-10 py-5">
                  Back to Homepage
                </Button>
              </Link>
            </div>
            <Typography className="text-sm text-gray-500 mt-10">
              If this was a mistake or you change your mind, feel free to subscribe again anytime.
            </Typography>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="space-y-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-14 h-14 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <Typography variant="h3" color="red" className="font-bold">
              Oops... something went wrong
            </Typography>
            <Typography className="text-lg md:text-xl text-gray-700">
              {message}
            </Typography>
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button color="gray" variant="outlined" size="lg" className="rounded-full px-10">
                  Back to Homepage
                </Button>
              </Link>
              <Button
                color="blue"
                size="lg"
                className="rounded-full px-10"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Suspense wrapper required by Next.js 16 when using useSearchParams()
export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  )
}