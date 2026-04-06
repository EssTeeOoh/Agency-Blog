'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import BlogPostCard from '@/app/components/blog/blog-post-card'

// sections
import Hero from './hero'
import Content from './content'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
import { getImageSrc } from '@/lib/getImageSrc'

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${API_URL}/api/posts/?limit=6`)
        if (!res.ok) throw new Error('Failed to fetch posts')
        const data = await res.json()
        setPosts(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <>
      <Hero />
      <Content />

      {/* Latest Posts Section */}
      <section className='py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-4xl font-bold text-center mb-12'>Latest Articles</h2>

          {loading && <p className='text-center'>Loading latest posts...</p>}
          {error && <p className='text-center text-red-600'>Error: {error}</p>}

          {!loading && !error && (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {posts.length === 0 ? (
                  <p className='col-span-full text-center text-gray-600'>
                    No posts yet – check back soon!
                  </p>
                ) : (
                  posts.map((post: any) => (
                    <Link key={post.id} href={`/blog/${post.slug}`}>
                      <BlogPostCard
                        img={getImageSrc(post.featured_image)}
                        tag={post.categories?.map((c: any) => c.name).join(', ') || 'General'}
                        title={post.title}
                        desc={post.excerpt || 'Read more...'}
                        author={{ name: post.author, img: '/images/avatar1.jpg' }}
                        date={new Date(post.publish_date).toLocaleDateString()}
                      />
                    </Link>
                  ))
                )}
              </div>

              <div className="text-center mt-16">
                <Link href="/blog/all">
                  <Button
                    color="blue"
                    size="lg"
                    className="rounded-full normal-case text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    View All Posts →
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}