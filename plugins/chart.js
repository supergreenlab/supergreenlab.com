import Vue from "vue"
import { Bar, } from "vue-chartjs/legacy"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  TimeScale,
  TimeSeriesScale,
} from "chart.js"
import 'chartjs-adapter-date-fns'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  LineController,
  TimeScale,
  TimeSeriesScale,
)

Vue.component("BarChart", {
  extends: Bar,
})
