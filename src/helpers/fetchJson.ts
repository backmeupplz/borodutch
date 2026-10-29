// Stats requests wait for the page's load event: stats.borodutch.com answers in about a second, and a request that
// starts before the first paint is counted into it by PageSpeed (mobile 95-99 on some cold loads). The page is
// prerendered, so nothing waits on these numbers to show up.
const pageLoaded = new Promise<void>((resolve) => {
  if (document.readyState === 'complete') resolve()
  else addEventListener('load', () => resolve(), { once: true })
})

export default async function fetchJson<T>(
  url: string,
  fallback: T
): Promise<T> {
  try {
    await pageLoaded
    const res = await fetch(url)
    if (!res.ok) {
      return fallback
    }
    return (await res.json()) as T
  } catch {
    return fallback
  }
}
