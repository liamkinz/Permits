<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { usePieCharts } from '../composables/usePieCharts'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

// Register plugin to display data labels outside pie chart
const dataLabelsPlugin = {
  id: 'dataLabels',
  afterDraw(chart: any) {
    if (chart.data.datasets.length === 0) return

    const { ctx } = chart
    const meta = chart.getDatasetMeta(0)
    const data = chart.data.datasets[0].data
    const labels = chart.data.labels || []

    if (!meta?.data || meta.data.length === 0) return

    meta.data.forEach((datapoint: any, index: number) => {
      if (!datapoint || datapoint.hidden) return

      const value = data[index]
      if (typeof value !== 'number' || value === 0) return

      try {
        // Get arc element position
        const x = datapoint.x
        const y = datapoint.y
        const outerRadius = datapoint.outerRadius || 100
        const startAngle = Number(datapoint.startAngle) || 0
        const endAngle = Number(datapoint.endAngle) || 0

        // Calculate midpoint angle
        const angle = (startAngle + endAngle) / 2

        // Position labels outside the pie
        const labelDistance = outerRadius + 40
        const labelX = x + Math.cos(angle - Math.PI / 2) * labelDistance
        const labelY = y + Math.sin(angle - Math.PI / 2) * labelDistance

        // Draw value
        ctx.fillStyle = '#000000'
        ctx.font = 'bold 13px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(value), labelX, labelY)

        // Draw label
        ctx.fillStyle = '#666666'
        ctx.font = 'normal 10px Arial'
        const label = String(labels[index] || '').replace(' Permits', '')
        ctx.fillText(label, labelX, labelY + 15)
      } catch (e) {
        console.error(`Label error at index ${index}:`, e)
      }
    })
  },
}

ChartJS.register(dataLabelsPlugin)

// Use composable
const {
  chartData,
  chartOptions,
  totalBuilding,
  totalOccupancy,
  totalIndigenous,
  totalFencing,
  totalSignage,
  totalElectrical,
  totalElectronic,
  grandTotal,
} = usePieCharts()
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold tracking-tight">Permits Distribution</h2>
      <p class="text-sm text-muted-foreground mt-1">
        Overall distribution of permits by type for 2026
      </p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Building Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalBuilding }}</p>
        <p class="text-xs text-muted-foreground mt-1">
          {{ ((totalBuilding / grandTotal) * 100).toFixed(1) }}% of total
        </p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Occupancy Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalOccupancy }}</p>
        <p class="text-xs text-muted-foreground mt-1">
          {{ ((totalOccupancy / grandTotal) * 100).toFixed(1) }}% of total
        </p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Indigenous Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalIndigenous }}</p>
        <p class="text-xs text-muted-foreground mt-1">
          {{ ((totalIndigenous / grandTotal) * 100).toFixed(1) }}% of total
        </p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Fencing Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalFencing }}</p>
        <p class="text-xs text-muted-foreground mt-1">
          {{ ((totalFencing / grandTotal) * 100).toFixed(1) }}% of total
        </p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Signage Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalSignage }}</p>
        <p class="text-xs text-muted-foreground mt-1">
          {{ ((totalSignage / grandTotal) * 100).toFixed(1) }}% of total
        </p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Electrical Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalElectrical }}</p>
        <p class="text-xs text-muted-foreground mt-1">
          {{ ((totalElectrical / grandTotal) * 100).toFixed(1) }}% of total
        </p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Electronic Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalElectronic }}</p>
        <p class="text-xs text-muted-foreground mt-1">
          {{ ((totalElectronic / grandTotal) * 100).toFixed(1) }}% of total
        </p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Grand Total</p>
        <p class="text-2xl font-bold mt-1">{{ grandTotal }}</p>
        <p class="text-xs text-muted-foreground mt-1">all permits</p>
      </div>
    </div>

    <!-- Pie Chart Card -->
    <div class="rounded-xl border bg-card p-6 shadow-sm">
      <div class="mb-4">
        <h3 class="text-lg font-semibold">Permit Types Distribution</h3>
        <p class="text-sm text-muted-foreground">Breakdown of all permits issued in 2026</p>
      </div>

      <!-- Chart.js Pie Chart -->
      <div class="w-full" style="height: 550px">
        <Pie :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>
