'use client'
import { useCart } from '@/contexts/cart-context'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface AddToCartButton extends ComponentProps<'button'> {
  productId: number
}

export function AddToCartButton({
  productId,
  className,
  ...props
}: AddToCartButton) {
  const { addToCart } = useCart()

  function handleAddProductToCart() {
    addToCart(productId)
  }

  return (
    <button
      {...props}
      onClick={handleAddProductToCart}
      type="button"
      className={twMerge(
        'mt-8 flex text-white h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold',
        className,
      )}
    >
      Adicionar ao carrinho
    </button>
  )
}
