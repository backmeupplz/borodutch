import { classnames } from 'classnames/tailwind'
import { dateLabel } from 'helpers/chartSeries'
import { useSnapshot } from 'valtio'
import { userCount } from 'helpers/userCount'
import Chart from 'components/Chart'
import Loader from 'components/Loader'

const container = classnames('mt-12')
// the loaded chart's size (the tall plot, its date labels and the figure's mb-6), held while the numbers load so
// nothing below jumps
const placeholder = {
  height: 212,
  marginBottom: 24,
  display: 'flex',
  alignItems: 'center',
}

export default function TotalNumberOfUsers() {
  const { loaded, userCount: data } = useSnapshot(userCount)
  const history = data.history
  return (
    <div className={container}>
      {!loaded ? (
        <div style={placeholder}>
          <Loader line />
        </div>
      ) : (
        Array.isArray(history) &&
        history.length > 0 && (
          <Chart
            tall
            data={{
              labels: history.map((v) => dateLabel(+v[0])),
              values: history.map((v) => +v[1]),
            }}
          />
        )
      )}
    </div>
  )
}
