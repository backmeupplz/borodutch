import { FC } from 'react'
import ReactFrappeChart, { ChartData } from 'react-frappe-charts'
import currentGradient from 'helpers/currentGradient'
import formatNumber from 'helpers/formatNumber'

const Chart: FC<{ title: string; data: ChartData }> = ({ title, data }) => (
  <div className="flex flex-col justify-items-stretch items-stretch w-full">
    <ReactFrappeChart
      title={title}
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
      data={data}
      tooltipOptions={{
        formatTooltipY: (d) => formatNumber(d),
      }}
    />
  </div>
)

export default Chart
