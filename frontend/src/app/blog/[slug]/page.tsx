'use client'

import React, { use, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Typography } from '@material-tailwind/react'
import BlogPostCard from '@/app/components/blog/blog-post-card'
import ShareButton from '@/app/components/sharebutton/ShareButton'
import Link from 'next/link'
import { getImageSrc } from '@/lib/getImageSrc'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`${API_URL}/api/posts/${slug}/`)
        if (!res.ok) {
          throw new Error(res.status === 404 ? 'Post not found' : 'Failed to load post')
        }
        const data = await res.json()
        setPost(data)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
        <Typography placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} variant="h5" color="blue-gray">
          Loading article...
        </Typography>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <Typography placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} variant="h4" color="red" className="mb-4">
          Oops!
        </Typography>
        <Typography placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} className="text-xl text-gray-700 mb-8 max-w-md">
          {error || 'Post not found'}
        </Typography>
        <Link href="/blog"><Button color="gray" size="lg" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} className="text-white">Back to Blog</Button></Link>
      </div>
    )
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-36 lg:pt-40 pb-16 md:pb-20 lg:pb-24">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16 lg:mb-20">
        <Typography placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
          variant="h3"
          className="mb-6 md:mb-8 text-3xl md:text-4xl lg:text-5xl font-bold"
          color="blue-gray"
        >
          {post.title}
        </Typography>
        <Typography placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
          variant="lead"
          className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-base md:text-lg"
        >
          {post.meta_description || post.excerpt || 'Read the latest insights...'}
        </Typography>
      </div>

      {/* Featured Image */}
      <div className="mb-12 md:mb-16 lg:mb-20">
        <Image
          src={getImageSrc(post.featured_image)}
          alt={post.title}
          width={1200}
          height={675}
          className="w-full h-auto rounded-xl object-cover shadow-xl"
          priority
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.jpg'
          }}
        />
      </div>

      {/* Content */}
      <div
        className="prose prose-lg md:prose-xl max-w-none mb-12 md:mb-16 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Author, Categories & Share */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12 mb-16 pb-10 border-t border-gray-200 pt-8">
        <div className="flex items-center gap-4 md:gap-5 flex-shrink-0">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <Image
              src="/images/avatar1.jpg"
              alt={post.author}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Typography placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} className="font-bold text-lg md:text-xl">
              {post.author}
            </Typography>
            <Typography placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} className="text-sm md:text-base text-gray-500">
              {new Date(post.publish_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          </div>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-between md:justify-end gap-6 md:gap-10 flex-grow">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {post.categories?.map((cat: any) => (
              <Button placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                key={cat.id}
                size="sm"
                color="gray"
                variant="outlined"
                className="rounded-full text-xs md:text-sm px-3 py-1"
              >
                {cat.name}
              </Button>
            ))}
          </div>
          <div className="self-center">
            <ShareButton
              url={typeof window !== 'undefined' ? window.location.href : ''}
              title={post.title}
              description={post.excerpt}
            />
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {post.related_posts?.length > 0 ? (
        <div className="mt-12 md:mt-16">
          <Typography placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} variant="h4" className="text-center mb-8 md:mb-10 font-bold">
            You might also like
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {post.related_posts.map((related: any) => (
              <div key={related.id} className="transition-transform hover:scale-[1.02]">
                <a href={`/blog/${related.slug}`} className="block">
                  <BlogPostCard
                    img={getImageSrc(related.featured_image)}
                    tag={related.categories?.map((c: any) => c.name).join(', ') || 'General'}
                    title={related.title}
                    desc={related.excerpt || 'Read more...'}
                    author={{ name: related.author, img: '/images/avatar1.jpg' }}
                    date={new Date(related.publish_date).toLocaleDateString()}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-12 md:mt-16 text-center text-gray-500 py-12">
          No related articles found yet.
        </div>
      )}
    </section>
  )
}