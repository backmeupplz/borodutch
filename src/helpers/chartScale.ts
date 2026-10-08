// Rounds the axis top up to 1, 2, 4 or 5 × 10^n so the half-way gridline is a clean number too
export function niceMax(value: number) {
  if (!(value > 0)) return 1
  const power = 10 ** Math.floor(Math.log10(value))
  return ([1, 2, 4, 5, 10].find((m) => m * power >= value) || 10) * power
}

// x as a 0-100 percentage of the plot width
export function xAt(index: number, count: number) {
  return count > 1 ? (index / (count - 1)) * 100 : 50
}

// Polyline in a 100×100 viewBox, y grows downwards
export function linePath(values: readonly number[], max: number) {
  return values
    .map(
      (value, i) =>
        `${i ? 'L' : 'M'}${+xAt(i, values.length).toFixed(2)} ${+(
          100 -
          (value / max) * 100
        ).toFixed(2)}`
    )
    .join('')
}
