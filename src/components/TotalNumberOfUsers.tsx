import { classnames } from 'classnames/tailwind'
import { dateLabel } from 'helpers/chartSeries'
import { useSnapshot } from 'valtio'
import { userCount } from 'helpers/userCount'
import Chart from 'components/Chart'
import Loader from 'components/Loader'

const container = classnames('mt-12')

export default function TotalNumberOfUsers() {
  const { loaded, userCount: data } = useSnapshot(userCount)
  const history = data.history
  return (
    <div className={container}>
      {!loaded ? (
        <Loader line />
      ) : (
        Array.isArray(history) &&
        history.length > 0 && (
          <Chart
            tall
            title="How many people used my apps"
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
