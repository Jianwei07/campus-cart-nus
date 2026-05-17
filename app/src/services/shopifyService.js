import { mockShopProducts } from '../data/mockData'

export const SOURCES = ['User-listed', 'IUIGA', 'Bookshop.sg', 'NUS Press', 'Portfolio Demo']
export const CONDITIONS = ['New / Sealed', 'Like New', 'Good', 'Used']
export const LOCATIONS = [
  'Kent Ridge Hall',
  "Prince George's Park",
  'UTown Residence',
  'Raffles Hall',
]

const ENDPOINTS = {
  IUIGA: 'https://www.iuiga.com/products.json?limit=20',
  'Bookshop.sg': 'https://bookshop.sg/products.json?limit=20',
  'NUS Press': 'https://nuspress.nus.edu.sg/products.json?limit=20',
}

const CACHE_KEY = 'campuscart_shopify_cache'
const CACHE_EXPIRY = 5 * 60 * 1000

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function assignMarketplaceAttributes(product) {
  return {
    ...product,
    condition: randomItem(CONDITIONS),
    location: randomItem(LOCATIONS),
    verified: Math.random() > 0.3,
  }
}

function normalizeShopifyProduct(item, source) {
  const image = item.images?.[0]?.src || ''
  const price = parseFloat(item.variants?.[0]?.price || '0')

  return {
    id: `${source}-${item.id}`,
    title: item.title,
    price,
    image,
    source,
    seller: { name: source },
    category: item.product_type || 'Other',
    description: item.body_html || '',
    externalUrl: item.handle ? `/${item.handle}` : '#',
  }
}

function readCachedProducts() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < CACHE_EXPIRY) return data
  } catch (error) {
    console.warn('Failed to read Shopify product cache:', error)
  }

  return null
}

function writeCachedProducts(products) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: products,
        timestamp: Date.now(),
      }),
    )
  } catch (error) {
    console.warn('Failed to write Shopify product cache:', error)
  }
}

export async function fetchProducts() {
  const cached = readCachedProducts()
  if (cached) return cached

  const productGroups = await Promise.all(
    Object.entries(ENDPOINTS).map(async ([source, url]) => {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const data = await response.json()
        return data.products.map((product) => normalizeShopifyProduct(product, source))
      } catch (error) {
        console.error(`Failed to fetch products from ${source}:`, error)
        return []
      }
    }),
  )

  const products = productGroups
    .flat()
    .map(assignMarketplaceAttributes)
    .sort(() => Math.random() - 0.5)

  if (products.length > 0) {
    writeCachedProducts(products)
    return products
  }

  return mockShopProducts
}
