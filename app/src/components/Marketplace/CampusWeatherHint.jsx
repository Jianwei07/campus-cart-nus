import { useEffect, useState } from 'react'
import { Cloud, CloudRain, CloudLightning, MapPin } from 'lucide-react'
import { fetchCampusWeather } from '../../services/weatherService'

const STYLE_BY_SEVERITY = {
  clear: {
    icon: Cloud,
    label: 'Pickup Window',
    card: 'border-blue-100 bg-blue-50/40',
    iconBox: 'bg-nus-blue text-white',
    text: 'text-nus-blue',
  },
  rain: {
    icon: CloudRain,
    label: 'Shelter Suggested',
    card: 'border-orange-100 bg-orange-50/50',
    iconBox: 'bg-nus-orange text-white',
    text: 'text-nus-orange',
  },
  storm: {
    icon: CloudLightning,
    label: 'Covered Meetup',
    card: 'border-red-100 bg-red-50/50',
    iconBox: 'bg-red-500 text-white',
    text: 'text-red-600',
  },
  unknown: {
    icon: Cloud,
    label: 'Pickup Tip',
    card: 'border-gray-100 bg-gray-50/70',
    iconBox: 'bg-gray-400 text-white',
    text: 'text-gray-600',
  },
}

export default function CampusWeatherHint({ highDemandLocation = '' }) {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetchCampusWeather(highDemandLocation)
      .then((data) => {
        if (!cancelled) setWeather(data)
      })
      .catch((error) => {
        console.warn('Campus weather unavailable:', error)
      })

    return () => {
      cancelled = true
    }
  }, [highDemandLocation])

  if (!weather) return null

  const style = STYLE_BY_SEVERITY[weather.severity] || STYLE_BY_SEVERITY.unknown
  const Icon = style.icon

  return (
    <aside className={`rounded-[1.75rem] border p-5 shadow-sm ${style.card}`}>
      <div className="flex items-start gap-4">
        <div className={`mt-0.5 rounded-2xl p-2.5 shadow-sm ${style.iconBox}`}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-black uppercase tracking-[0.22em] ${style.text}`}>
              {style.label}
            </span>
            <span className="rounded-full bg-white/80 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-gray-400">
              {weather.area}
            </span>
          </div>

          <p className="mt-2 text-sm font-black leading-snug text-gray-900">{weather.forecast}</p>
          <p className="mt-1 text-xs font-semibold leading-relaxed text-gray-500">
            {weather.message}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <MapPin className="h-3.5 w-3.5 text-nus-orange/70" />
            <span className="truncate">{weather.suggestedSpot}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
