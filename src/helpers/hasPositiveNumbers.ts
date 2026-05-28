export default function hasPositiveNumbers(...values: unknown[]) {
  return values.every(
    (value) => typeof value === 'number' && Number.isFinite(value) && value > 0
  )
}
