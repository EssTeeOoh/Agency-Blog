'use client'
import React, { useState, useEffect } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

function validate(name: string, email: string): string | null {
  if (!name.trim() || name.trim().length < 2) return 'Please enter your full name (at least 2 characters).'
  if (!email.trim()) return 'Please enter your email address.'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) return 'Please enter a valid email address.'
  return null
}

const Join = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (window.location.hash === '#Join') {
      const el = document.getElementById('Join')
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setIsError(false)

    // Client-side validation
    const validationError = validate(name, email)
    if (validationError) {
      setMessage(validationError)
      setIsError(true)
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/subscribe/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        setMessage('') // clear any previous messages
      } else {
        let errMsg = 'Something went wrong. Please try again.'

        // Special handling for rate limit (429)
        if (response.status === 429) {
          errMsg = "You can only subscribe once every 15 minutes. Please try again later."
        } 
        else if (data.name?.[0]) {
          errMsg = data.name[0]
        } 
        else if (data.email?.[0]) {
          errMsg = data.email[0]
        } 
        else if (data.detail) {
          errMsg = data.detail
        }

        setMessage(errMsg)
        setIsError(true)
      }
    } catch (err) {
      setMessage('Network error, please check your connection and try again.')
      setIsError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="Join" className='overflow-hidden bg-joinus'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='text-center'>
          <p className='text-primary text-lg font-normal tracking-widest uppercase'>
            Let's Work Together
          </p>
          <h2 className='my-6 text-3xl md:text-4xl font-bold'>
            Ready to grow your online presence?
          </h2>
          <p className='text-black/70 text-base md:text-lg font-normal max-w-3xl mx-auto leading-relaxed mb-10'>
            Join our newsletter to stay updated with fresh insights, tips, and behind-the-scenes
            stories from the world of web development and digital growth.
            <br /><br />
            Or even better, <strong>let us build (or level up) your website for you</strong>.
            Our agency creates fast, modern, high-converting websites tailored exactly to your
            business needs. Drop your details below and someone from the team will reach out
            within 24–48 hours to discuss your project.
          </p>
        </div>

        <div className='mx-auto max-w-4xl pt-5'>
          {submitted ? (
            /* Success state */
            <div className='text-center py-12 px-6'>
              <div className='text-5xl mb-4'>🎉</div>
              <h3 className='text-2xl font-bold text-gray-800 mb-3'>
                You're in!
              </h3>
              <p className='text-gray-600 text-lg max-w-md mx-auto'>
                Welcome, <span className='font-semibold text-primary'>{name}</span>! 
                Check your inbox, a welcome email is on its way. We'll be in touch soon.
              </p>
            </div>
          ) : (
            /* Form */
            <>
              <form
                onSubmit={handleSubmit}
                noValidate
                className='sm:flex items-center mx-5 p-5 sm:p-0 rounded-xl justify-between bg-grey sm:rounded-full'
              >
                <div>
                  <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='my-4 py-4 sm:pl-6 lg:text-xl text-black sm:rounded-full bg-transparent pl-1 focus:outline-hidden bg-emailbg focus:text-black'
                    placeholder='Your name *'
                    autoComplete='off'
                    required
                  />
                </div>
                <div>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='my-4 py-4 sm:pl-6 lg:text-xl text-black sm:border-l border-linegrey bg-transparent focus:outline-hidden bg-emailbg focus:text-black'
                    placeholder='Your email *'
                    autoComplete='off'
                    required
                  />
                </div>
                <div className='sm:mr-3'>
                  <button
                    type='submit'
                    disabled={loading}
                    className={`w-full sm:w-auto text-xl text-white font-semibold text-center rounded-xl sm:rounded-full bg-primary py-5 px-12 hover:bg-darkmode duration-300 ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Sending...' : 'Get Started'}
                  </button>
                </div>
              </form>

              {message && (
                <p className={`mt-4 text-center text-base font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
                </p>
              )}

              <p className='text-center text-gray-500 text-sm mt-6'>
                We respect your privacy, your details are safe with us.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Join