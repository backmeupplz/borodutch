<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options', 'internalGradient'],
  data() {
    return {
      gradient: null,
    }
  },
  mounted() {
    setTimeout(() => {
      this.gradient = this.$refs.canvas
        .getContext('2d')
        .createLinearGradient(
          0,
          0,
          this.$refs.canvas.width,
          this.$refs.canvas.height
        )
      const components = this.internalGradient
        .split(', ')
        .slice(1)
        .map((c) => c.split(' '))
      for (const component of components) {
        const percentage = component[1]
          ? +component[1].substr(0, component[1].length - 1) / 100
          : 1
        this.gradient.addColorStop(percentage, component[0])
      }

      const chartData = this.chartData
      chartData.datasets = chartData.datasets.map((d) => {
        d.backgroundColor = this.gradient
        return d
      })

      this.renderChart(chartData, this.options)
    }, 1500)
  },
}
</script>
