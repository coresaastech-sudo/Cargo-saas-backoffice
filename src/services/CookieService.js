const EXPIRE_TIME = 1000 * 60 * 5
const CARGO_CACHE = 'CARGO_SAAS_CACHE'

const currentTime = () => Date.now()

const encodeCookie = (value) => encodeURIComponent(value ?? '')
const decodeCookie = (value) => decodeURIComponent(value ?? '')

export const GetCookie = (name) => {
  if (!name) return ''

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)

  if (parts.length === 2) {
    return decodeCookie(parts.pop().split(';').shift())
  }

  return ''
}

export const SetCookie = (name, value, options = 1) => {
  if (!name) return

  if (typeof options === 'object' && options !== null) {
    const path = options.path || '/'
    const expires = options.expires ? `; expires=${new Date(options.expires).toUTCString()}` : ''
    const sameSite = options.sameSite ? `; SameSite=${options.sameSite}` : '; SameSite=Lax'
    document.cookie = `${name}=${encodeCookie(value)}${expires}; path=${path}${sameSite}`
    return
  }

  const expires = new Date(Date.now() + options * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${encodeCookie(value)}; expires=${expires}; path=/; SameSite=Lax`
}

export const RemoveCookie = (name) => {
  if (!name) return
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`
}

export function GetTimeCookie(key) {
  const cache = getCargoCache()

  if (cache && cache[key]) {
    if (cache[key].expiry <= currentTime()) {
      delete cache[key]
      localStorage.setItem(CARGO_CACHE, JSON.stringify(cache))
      return null
    }

    return cache[key].data
  }

  return null
}

export function SetTimeCookie(key, value, time) {
  const cache = getCargoCache()
  cache[key] = {
    expiry: currentTime() + (time ?? EXPIRE_TIME),
    data: value,
  }
  localStorage.setItem(CARGO_CACHE, JSON.stringify(cache))
}

const getCargoCache = () => {
  try {
    const raw = localStorage.getItem(CARGO_CACHE)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (error) {
    console.error(error.message)
  }

  return {}
}
