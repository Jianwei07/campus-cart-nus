const WEATHER_CACHE_KEY = 'campuscart_weather_cache'
const WEATHER_CACHE_TTL = 20 * 60 * 1000
const WEATHER_ENDPOINT = 'https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast'
const CAMPUS_AREAS = ['Clementi', 'Bukit Timah', 'Queenstown']

function readCache() {
  try {
    const cached = sessionStorage.getItem(WEATHER_CACHE_KEY)
    if (!cached) return null

    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < WEATHER_CACHE_TTL) return data
  } catch (error) {
    console.warn('Failed to read weather cache:', error)
  }

  return null
}

function writeCache(data) {
  try {
    sessionStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
  } catch (error) {
    console.warn('Failed to write weather cache:', error)
  }
}

function getSeverity(forecast = '') {
  const value = forecast.toLowerCase()
  if (value.includes('thunder')) return 'storm'
  if (value.includes('rain') || value.includes('showers')) return 'rain'
  if (value.includes('fair') || value.includes('sunny') || value.includes('cloudy')) return 'clear'
  return 'unknown'
}

function getPickupCopy(severity, forecast, highDemandLocation) {
  if (severity === 'storm') {
    return {
      message: highDemandLocation
        ? `${highDemandLocation} demand high. Storm risk: use covered meetup.`
        : 'Storm risk near campus. Use covered meetup spots.',
      suggestedSpot: 'UTown, COM1, or Central Library',
    }
  }

  if (severity === 'rain') {
    return {
      message: highDemandLocation
        ? `${highDemandLocation} demand high. Rain expected: keep pickup sheltered.`
        : 'Rain expected near campus. Pick sheltered handoff spots.',
      suggestedSpot: 'UTown, COM1, or Central Library',
    }
  }

  if (severity === 'clear') {
    return {
      message: highDemandLocation
        ? `${highDemandLocation} demand high. ${forecast} weather suits quick pickup.`
        : `${forecast} near campus. Good window for quick pickup.`,
      suggestedSpot: 'Hall lobbies or faculty entrances',
    }
  }

  return {
    message: 'Weather unavailable. Prefer easy-to-find campus meetup spots.',
    suggestedSpot: 'UTown, COM1, or Central Library',
  }
}

function normalizeWeather(data, highDemandLocation = '') {
  const item = data?.data?.items?.[0]
  const campusForecast = CAMPUS_AREAS.map((area) =>
    item?.forecasts?.find((entry) => entry.area === area),
  ).find(Boolean)

  const forecast = campusForecast?.forecast || 'Unknown'
  const severity = getSeverity(forecast)
  const copy = getPickupCopy(severity, forecast, highDemandLocation)

  return {
    area: campusForecast?.area || 'Kent Ridge',
    forecast,
    severity,
    validPeriod: item?.valid_period?.text || '',
    ...copy,
  }
}

export async function fetchCampusWeather(highDemandLocation = '') {
  const cached = readCache()
  if (cached) return { ...cached, ...getPickupCopy(cached.severity, cached.forecast, highDemandLocation) }

  const response = await fetch(WEATHER_ENDPOINT)
  if (!response.ok) throw new Error(`Weather HTTP ${response.status}`)

  const weather = normalizeWeather(await response.json(), highDemandLocation)
  writeCache(weather)
  return weather
}
