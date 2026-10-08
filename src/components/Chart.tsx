import { ChartSeries } from 'models/Project'
import { FC, PointerEvent, useMemo, useState } from 'react'
import { classnames } from 'classnames/tailwind'
import { linePath, niceMax, xAt } from 'helpers/chartScale'
import currentGradient from 'helpers/currentGradient'
import formatNumber from 'helpers/formatNumber'

const color = currentGradient[0]
const compact = new Intl.NumberFormat('en', { notation: 'compact' })

const figure = classnames('w-full', 'mb-6')
const caption = classnames('text-white', 'opacity-80', 'text-sm', 'mb-2')
const axisText = classnames('text-xs', 'text-white', 'opacity-50')
const yAxis = classnames(
  axisText,
  'flex',
  'flex-col',
  'justify-between',
  'items-end',
  'w-10',
  'pr-2',
  'flex-shrink-0',
  '-my-2'
)
const plot = (tall?: boolean) =>
  classnames('relative', 'flex-1', tall ? 'h-48' : 'h-32')
const xAxis = classnames(axisText, 'flex', 'justify-between', 'mt-1', 'pl-10')
const crosshair = classnames(
  'absolute',
  'inset-y-0',
  'w-px',
  'bg-white',
  'opacity-30',
  'pointer-events-none'
)
const dot = classnames(
  'absolute',
  'w-2',
  'h-2',
  'rounded-full',
  'ring-2',
  'ring-black',
  'pointer-events-none'
)
const tooltip = classnames(
  'absolute',
  'top-0',
  'bg-gray-900',
  'rounded-lg',
  'px-2',
  'py-1',
  'text-xs',
  'text-white',
  'whitespace-nowrap',
  'pointer-events-none'
)

const Chart: FC<{ title: string; data: ChartSeries; tall?: boolean }> = ({
  title,
  data: { labels, values },
  tall,
}) => {
  const [active, setActive] = useState<number>()
  const max = useMemo(() => niceMax(Math.max(...values)), [values])
  const line = useMemo(() => linePath(values, max), [values, max])
  if (!values.length) return null

  const last = values.length - 1
  const shown = active ?? (last ? undefined : 0)
  const x = shown === undefined ? 0 : xAt(shown, values.length)
  const pick = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - box.left) / box.width
    setActive(Math.min(last, Math.max(0, Math.round(ratio * last))))
  }

  return (
    <figure className={figure}>
      <figcaption className={caption}>{title}</figcaption>
      <div className="flex">
        <div className={yAxis} aria-hidden>
          <span>{compact.format(max)}</span>
          <span>{compact.format(max / 2)}</span>
          <span>0</span>
        </div>
        <div
          className={plot(tall)}
          role="img"
          aria-label={`${title}: ${formatNumber(values[last])} on ${
            labels[last]
          }`}
          onPointerMove={pick}
          onPointerDown={pick}
          onPointerLeave={() => setActive(undefined)}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full overflow-visible"
          >
            {[0, 50, 100].map((y) => (
              <line
                key={y}
                x1={0}
                x2={100}
                y1={y}
                y2={y}
                stroke="#fff"
                strokeOpacity={0.12}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {last > 0 && (
              <path d={`${line}L100 100L0 100Z`} fill={color} opacity={0.12} />
            )}
            <path
              d={line}
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {shown !== undefined && (
            <>
              <div className={crosshair} style={{ left: `${x}%` }} />
              <div
                className={dot}
                style={{
                  background: color,
                  left: `${x}%`,
                  top: `${100 - (values[shown] / max) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
              <div
                className={tooltip}
                style={{
                  left: `${x}%`,
                  transform: `translateX(${
                    x > 50 ? 'calc(-100% - 8px)' : '8px'
                  })`,
                }}
              >
                <span className="opacity-60">{labels[shown]}</span>{' '}
                {formatNumber(values[shown])}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={xAxis} aria-hidden>
        <span>{labels[0]}</span>
        {last > 1 && <span>{labels[last >> 1]}</span>}
        {last > 0 && <span>{labels[last]}</span>}
      </div>
    </figure>
  )
}

export default Chart
