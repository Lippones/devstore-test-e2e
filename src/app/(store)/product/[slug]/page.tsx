import { AddToCartButton } from '@/components/add-to-cart-button'
import { api } from '@/services/api'
import { Product } from '@/services/types/product'
import { Metadata } from 'next'
import Image from 'next/image'

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

interface ProductProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured')

  const products = await response.json()

  return products.map((product: Product) => {
    return {
      slug: product.slug,
    }
  })
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.slug)
  return (
    <div className="relative grid grid-cols-3 max-h-[860px]">
      <div className="overflow-hidden col-span-2">
        <Image
          src={product.image}
          quality={100}
          alt={product.title}
          width={1000}
          height={1000}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5  py-2.5 font-semibold">
            {new Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(product.price)}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/ juros de{' '}
            {new Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(product.price / 12)}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 font-semibold text-sm"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 font-semibold text-sm"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 font-semibold text-sm"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 font-semibold text-sm"
            >
              GG
            </button>
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}
