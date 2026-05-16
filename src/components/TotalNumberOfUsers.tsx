import { Suspense } from 'react'
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

const container = classnames('mt-12')
const chartContainer = classnames('w-full')

export default function TotalNumberOfUsers() {
  return (
    <div className={container}>
      <div className={chartContainer}>
        <Suspense fallback={<Loader />}>
          <UsersChart />
        </Suspense>
      </div>
    </div>
  )
}
