import data from '../data.json'

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const featured = data.products.filter((product) => product.featured)

  return Response.json(featured)
}
