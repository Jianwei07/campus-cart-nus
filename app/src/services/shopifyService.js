import { mockShopProducts } from '../data/mockData'

export const SOURCES = ['User-listed', 'Portfolio Demo']
export const CONDITIONS = ['New / Sealed', 'Like New', 'Good', 'Used']
export const LOCATIONS = [
  'Kent Ridge Hall',
  "Prince George's Park",
  'UTown Residence',
  'Raffles Hall',
]

export async function fetchProducts() {
  return mockShopProducts
}
