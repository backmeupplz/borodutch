import fetch from 'unfetch'

export default async function fetchJson<T>(
  url: string,
  fallback: T
): Promise<T> {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      return fallback
    }
    return (await res.json()) as T
  } catch {
    return fallback
  }
}
