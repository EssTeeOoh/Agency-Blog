'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import Link from 'next/link'
import ArticlesSkeleton from '../../Skeleton/Articles'
import { getImageSrc } from '@/lib/getImageSrc'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 2,
  arrows: false,
  autoplay: false,
  speed: 500,
  cssEase: 'linear',
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
}

const Articles = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${API_URL}/api/posts/?limit=6`)
        if (!res.ok) throw new Error(`Failed to fetch posts (${res.status})`)
        const data = await res.json()
        setPosts(data)
      } catch (err: any) {
        console.error('Error fetching blog posts:', err)
        setError('Could not load latest articles. Please make sure the backend is running.')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section id='Blog' className='relative bg-grey overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4 relative'>
        <div className='text-center'>
          <p className='text-primary text-xl font-normal tracking-widest'>
            ARTICLES
          </p>
          <h2>Our latest posts.</h2>
        </div>

        {error && (
          <p className='text-center text-red-600 mt-8 text-lg'>{error}</p>
        )}

        <Slider {...settings}>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <ArticlesSkeleton key={i} />
            ))
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No articles yet. Check back soon!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="px-2">
                <div className='bg-white m-3 px-3 pt-3 pb-12 my-10 shadow-lg rounded-4xl relative overflow-hidden'>
                  <Image
                    src={getImageSrc(post.featured_image)}
                    alt={post.title || 'Blog post'}
                    width={389}
                    height={262}
                    className='inline-block w-full rounded-3xl object-cover'
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder.jpg'
                    }}
                  />

                  <Link
                    href={`/blog/${post.slug}`}
                    className='absolute top-4 right-4 text-base bg-primary text-white hover:bg-black hover:shadow-xl py-2 px-5 rounded-full z-10 transition-all'
                  >
                    5 min read
                  </Link>

                  <div className="pt-6 px-2">
                    <h5 className='font-bold text-xl line-clamp-2 mb-3'>
                      {post.title}
                    </h5>
                    <p className='text-sm font-normal pb-4 text-black/75 dark:text-white/75 line-clamp-3'>
                      {post.excerpt || 'Read the full article...'}
                    </p>
                    <div className='mt-4 flex items-center justify-between text-sm text-black/75 dark:text-white/75'>
                      <span>{post.author}</span>
                      <span>{new Date(post.publish_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </Slider>
      </div>
    </section>
  )
}

export default Articles