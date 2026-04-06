const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
const PLACEHOLDER = '/images/placeholder.jpg'

export function getImageSrc(imagePath: string | null | undefined): string {
  if (!imagePath) return PLACEHOLDER
  if (imagePath.startsWith('http')) return imagePath
  const clean = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
  return `${API_URL}${clean}`
}