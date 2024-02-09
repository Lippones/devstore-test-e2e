import { env } from '@/env'
import { api } from '@/services/api'
import { Product } from '@/services/types/product'
import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hours,
      tags: [`products-${slug}`],
    },
  })

  const products = await response.json()

  return products
}

// Image generation
export default async function OgImage({
  params,
}: {
  params: {
    slug: string
  }
}) {
  // Font
  // const interSemiBold = fetch(
  //   new URL('./Inter-SemiBold.ttf', import.meta.url),
  // ).then((res) => res.arrayBuffer())

  const product = await getProduct(params.slug)

  const productImageURL = new URL(product.image, env.VERCEL_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={productImageURL} alt="" style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}
