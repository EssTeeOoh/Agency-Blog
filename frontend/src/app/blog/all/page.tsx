'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import BlogPostCard from '@/app/components/blog/blog-post-card'
import { Button } from '@material-tailwind/react'
import { getImageSrc } from '@/lib/getImageSrc'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export default function AllPosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const PAGE_SIZE = 6

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `${API_URL}/api/posts/?page=${currentPage}&page_size=${PAGE_SIZE}`
        )
        if (!res.ok) throw new Error('Failed to fetch posts')
        const data = await res.json()

        // DRF paginated response shape:
        // { count, next, previous, results: [...] }
        setPosts(data.results ?? data)
        setTotalCount(data.count ?? data.length)
        setTotalPages(Math.ceil((data.count ?? data.length) / PAGE_SIZE))
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [currentPage])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const goToPage = (page: number) => {
    setCurrentPage(page)
    scrollToTop()
  }

  return (
    <section className='py-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-bold text-center mb-4'>
          All Articles
        </h1>

        {!loading && totalCount > 0 && (
          <p className='text-center text-gray-500 mb-12'>
            {totalCount} article{totalCount !== 1 ? 's' : ''}
          </p>
        )}

        {loading && <p className='text-center text-xl py-20'>Loading posts...</p>}
        {error && <p className='text-center text-red-600 text-xl py-20'>{error}</p>}

        {!loading && !error && (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {posts.length === 0 ? (
                <p className='col-span-full text-center text-gray-600 text-xl'>
                  No posts yet. Check back soon!
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

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className='flex items-center justify-center gap-2 mt-16'>
                <Button placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                  variant="outlined"
                  color="blue"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                  className='rounded-full normal-case'
                >
                  ← Prev
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <Button placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                  variant="outlined"
                  color="blue"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                  className='rounded-full normal-case'
                >
                  Next →
                </Button>
              </div>
            )}
          </>
        )}

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} color="gray" variant="outlined" size="lg">
              ← Back to Latest Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}