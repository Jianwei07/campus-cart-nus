function svgImage(label, bg = '#E8F1FB', fg = '#003D7C') {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">
      <rect width="900" height="700" fill="${bg}"/>
      <circle cx="720" cy="110" r="180" fill="#ffffff" opacity="0.35"/>
      <circle cx="130" cy="590" r="190" fill="#EF7C00" opacity="0.12"/>
      <rect x="140" y="190" width="620" height="320" rx="44" fill="#ffffff" opacity="0.82"/>
      <text x="450" y="330" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="58" font-weight="800" fill="${fg}">${label}</text>
      <text x="450" y="392" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="24" font-weight="700" fill="#64748B">CampusCart demo item</text>
    </svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function avatar(label, bg = '#003D7C') {
  const initials = label
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <rect width="160" height="160" rx="44" fill="${bg}"/>
      <text x="80" y="94" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="52" font-weight="800" fill="#fff">${initials}</text>
    </svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const now = Date.now()
const hoursAgo = (hours) => new Date(now - hours * 60 * 60 * 1000).toISOString()

export const MOCK_USER = {
  id: 'demo-user',
  name: 'Demo Student',
  email: 'demo.student@example.com',
  image: avatar('Demo Student'),
}

const sellers = [
  MOCK_USER,
  { id: 'seller-maya', name: 'Maya Chen', image: avatar('Maya Chen', '#EF7C00') },
  { id: 'seller-ryan', name: 'Ryan Koh', image: avatar('Ryan Koh', '#155E75') },
  { id: 'seller-sara', name: 'Sara Lim', image: avatar('Sara Lim', '#7C3AED') },
]

export const mockListings = [
  {
    id: 'listing-laptop-stand',
    title: 'Aluminium Laptop Stand',
    description: 'Foldable laptop stand for lectures and desk setups. Lightly used and easy to carry.',
    price: 18,
    condition: 'Like New',
    location: 'UTown Residence',
    imageUrl: svgImage('Laptop Stand'),
    status: 'active',
    seller: sellers[0],
    sellerId: sellers[0].id,
    category: { id: 'cat-electronics', name: 'Electronics' },
    createdAt: hoursAgo(2),
    updatedAt: hoursAgo(2),
  },
  {
    id: 'listing-textbook',
    title: 'Discrete Mathematics Textbook',
    description: 'Clean copy with a few pencil notes. Good for CS and math revision.',
    price: 16,
    condition: 'Good',
    location: 'School of Computing',
    imageUrl: svgImage('Textbook', '#FFF7ED', '#9A3412'),
    status: 'active',
    seller: sellers[1],
    sellerId: sellers[1].id,
    category: { id: 'cat-books', name: 'Books' },
    createdAt: hoursAgo(8),
    updatedAt: hoursAgo(8),
  },
  {
    id: 'listing-keyboard',
    title: 'Wireless Mechanical Keyboard',
    description: 'Compact keyboard with brown switches. Comes with USB-C cable.',
    price: 55,
    condition: 'Good',
    location: 'Kent Ridge Hall',
    imageUrl: svgImage('Keyboard', '#F1F5F9', '#0F172A'),
    status: 'active',
    seller: sellers[2],
    sellerId: sellers[2].id,
    category: { id: 'cat-electronics', name: 'Electronics' },
    createdAt: hoursAgo(24),
    updatedAt: hoursAgo(24),
  },
  {
    id: 'listing-chair',
    title: 'Study Chair for Hall Room',
    description: 'Comfortable chair for a small desk. Pickup near PGP.',
    price: 28,
    condition: 'Fair',
    location: "Prince George's Park",
    imageUrl: svgImage('Study Chair', '#ECFDF5', '#047857'),
    status: 'active',
    seller: sellers[3],
    sellerId: sellers[3].id,
    category: { id: 'cat-furniture', name: 'Furniture' },
    createdAt: hoursAgo(36),
    updatedAt: hoursAgo(36),
  },
]

export const mockRequests = [
  {
    id: 'request-calculator',
    title: 'Looking for a scientific calculator',
    description: 'Need an exam-approved calculator this week. Prefer clean display and working buttons.',
    budget: 25,
    condition: 'Good',
    location: 'Science Faculty',
    status: 'active',
    user: sellers[1],
    userId: sellers[1].id,
    category: { id: 'cat-electronics', name: 'Electronics' },
    createdAt: hoursAgo(1),
    updatedAt: hoursAgo(1),
  },
  {
    id: 'request-monitor',
    title: 'Need a 24 inch monitor',
    description: 'Looking for a basic monitor for coding in hall. HDMI support would be ideal.',
    budget: 90,
    condition: 'Used',
    location: 'UTown Residence',
    status: 'active',
    user: sellers[0],
    userId: sellers[0].id,
    category: { id: 'cat-electronics', name: 'Electronics' },
    createdAt: hoursAgo(5),
    updatedAt: hoursAgo(5),
  },
  {
    id: 'request-urgent-blazer',
    title: 'Formal blazer for presentation',
    description: 'Urgent: need a navy or black blazer for a final presentation tomorrow.',
    budget: 40,
    condition: 'Good',
    location: 'Kent Ridge Hall',
    status: 'active',
    user: sellers[2],
    userId: sellers[2].id,
    category: { id: 'cat-clothing', name: 'Clothing' },
    createdAt: hoursAgo(12),
    updatedAt: hoursAgo(12),
  },
]

export const mockProfile = {
  ...MOCK_USER,
  bio: 'Portfolio demo persona for showcasing CampusCart UI flows.',
  phone: null,
  location: 'UTown Residence',
  createdAt: '2026-01-15T08:00:00.000Z',
  listingCount: mockListings.filter((listing) => listing.sellerId === MOCK_USER.id).length,
}

export const mockShopProducts = [
  {
    id: 'shop-notebook',
    title: 'Campus Notebook Bundle',
    price: 9.9,
    image: svgImage('Notebooks', '#F8FAFC', '#1D4ED8'),
    source: 'Portfolio Demo',
    seller: { name: 'Demo Store' },
    condition: 'New / Sealed',
    location: 'NUS Campus',
    category: 'Stationery',
    description: 'Static mock store listing used for the portfolio build.',
    verified: true,
  },
  {
    id: 'shop-desk-lamp',
    title: 'Compact Desk Lamp',
    price: 22,
    image: svgImage('Desk Lamp', '#FEFCE8', '#A16207'),
    source: 'Portfolio Demo',
    seller: { name: 'Demo Store' },
    condition: 'New / Sealed',
    location: 'Raffles Hall',
    category: 'Furniture',
    description: 'Static mock store listing used for the portfolio build.',
    verified: true,
  },
]
