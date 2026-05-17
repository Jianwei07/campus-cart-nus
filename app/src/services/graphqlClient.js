import { mockListings, mockProfile, mockRequests } from '../data/mockData'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function operationName(query) {
  return query.match(/\b(query|mutation)\s+(\w+)/)?.[2] || ''
}

export async function graphqlRequest(query, variables = {}) {
  const op = operationName(query)

  if (op === 'GetListings' || op === 'GetMyActivity') {
    const listings = variables.sellerId
      ? mockListings.filter((listing) => listing.sellerId === variables.sellerId)
      : mockListings
    const requests = variables.userId
      ? mockRequests.filter((request) => request.userId === variables.userId)
      : mockRequests

    if (op === 'GetMyActivity') return clone({ listings, requests })
    return clone({ listings })
  }

  if (op === 'GetListing') {
    return clone({
      listing: mockListings.find((listing) => listing.id === variables.id) || null,
    })
  }

  if (op === 'GetRequests') {
    const requests = variables.userId
      ? mockRequests.filter((request) => request.userId === variables.userId)
      : mockRequests
    return clone({ requests })
  }

  if (op === 'GetRequest') {
    return clone({
      request: mockRequests.find((request) => request.id === variables.id) || null,
    })
  }

  if (op === 'GetRequestLocationCounts') {
    const counts = mockRequests.reduce((map, request) => {
      if (request.location) map[request.location] = (map[request.location] || 0) + 1
      return map
    }, {})
    return {
      requestLocationCounts: Object.entries(counts).map(([location, requestCount]) => ({
        location,
        requestCount,
      })),
    }
  }

  if (op === 'Me') return clone({ me: mockProfile })

  if (op === 'UpdateProfile') return clone({ updateProfile: { ...mockProfile, ...variables.input } })
  if (op === 'CreateListing') return clone({ createListing: { id: 'demo-new-listing', title: variables.input?.title || 'Demo Listing' } })
  if (op === 'UpdateListing') return clone({ updateListing: { id: variables.id, title: variables.input?.title || 'Demo Listing' } })
  if (op === 'DeleteListing') return clone({ deleteListing: { id: variables.id } })
  if (op === 'CreateRequest') return clone({ createRequest: { id: 'demo-new-request', title: variables.input?.title || 'Demo Request' } })
  if (op === 'UpdateRequest') return clone({ updateRequest: { id: variables.id, title: variables.input?.title || 'Demo Request' } })
  if (op === 'DeleteRequest') return clone({ deleteRequest: { id: variables.id } })
  if (op === 'CreatePaymentIntent') {
    throw new Error('Payment is disabled in portfolio demo mode.')
  }

  throw new Error(`Unsupported demo GraphQL operation: ${op || 'unknown'}`)
}
