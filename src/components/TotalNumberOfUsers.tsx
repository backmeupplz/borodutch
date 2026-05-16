import { Suspense } from 'react'
import { arr } from 'helpers/arr'
import { classnames } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import { userCount } from 'helpers/userCount'
import Loader from 'components/Loader'
import ReactFrappeChart from 'react-frappe-charts'
import currentGradient from 'helpers/currentGradient'
import formatNumber from 'helpers/formatNumber'

function UsersChart() {
  const userCountSnapshot = useSnapshot(userCount)
  if (!userCountSnapshot.userCount.history.length) {
    return null
  }
  return (
    <ReactFrappeChart
      title="How many people used my apps"
      type="line"
      colors={[currentGradient[0]]}
      axisOptions={{
        xAxisMode: 'tick',
        yAxisMode: 'tick',
        xIsSeries: 1,
        shortenYAxisNumbers: 1,
      }}
      lineOptions={{
        regionFill: 1,
        hideDots: 1,
      }}
      height={200}
      data={{
        labels: userCountSnapshot.userCount.history.map((v) =>
          new Date(+v[0]).toLocaleDateString()
        ),
        datasets: [
          { values: userCountSnapshot.userCount.history.map((v) => +v[1]) },
        ],
      }}
      tooltipOptions={{
        formatTooltipY: (d) => formatNumber(d),
      }}
    />
  )
}

function ArrChart() {
  const arrSnapshot = useSnapshot(arr)
  if (!arrSnapshot.arr.history.length) {
    return null
  }
  const formatter = new Intl.NumberFormat(undefined, {
    currency: arrSnapshot.arr.currency.toUpperCase(),
    maximumFractionDigits: 0,
    style: 'currency',
  })
  return (
    <ReactFrappeChart
      title="Annual recurring revenue"
      type="line"
      colors={[currentGradient[1] || currentGradient[0]]}
      axisOptions={{
        xAxisMode: 'tick',
        yAxisMode: 'tick',
        xIsSeries: 1,
        shortenYAxisNumbers: 1,
      }}
      lineOptions={{
        regionFill: 1,
        hideDots: 1,
      }}
      height={200}
      data={{
        labels: arrSnapshot.arr.history.map((v) => v.month),
        datasets: [
          {
            values: arrSnapshot.arr.history.map(
              (v) => v.annualRecurringRevenue
            ),
          },
        ],
      }}
      tooltipOptions={{
        formatTooltipY: (d) => formatter.format(d),
      }}
    />
  )
}

const container = classnames('mt-12')
const chartsContainer = classnames('flex', 'flex-col', 'md:flex-row', 'gap-4')
const chartContainer = classnames('w-full', 'md:w-1/2')

export default function TotalNumberOfUsers() {
  return (
    <div className={container}>
      <div className={chartsContainer}>
        <div className={chartContainer}>
          <Suspense fallback={<Loader />}>
            <UsersChart />
          </Suspense>
        </div>
        <div className={chartContainer}>
          <Suspense fallback={<Loader />}>
            <ArrChart />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
