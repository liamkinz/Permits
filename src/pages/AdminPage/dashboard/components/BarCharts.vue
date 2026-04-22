<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useBarCharts } from '../composables/useBarCharts'

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
  bestMonth,
} = useBarCharts()
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold tracking-tight">Permits Overview</h2>
      <p class="text-sm text-muted-foreground mt-1">
        Monthly breakdown of permits by type for 2026
      </p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Building Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalBuilding }}</p>
        <p class="text-xs text-muted-foreground mt-1">total permits</p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Occupancy Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalOccupancy }}</p>
        <p class="text-xs text-muted-foreground mt-1">total permits</p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Indigenous Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalIndigenous }}</p>
        <p class="text-xs text-muted-foreground mt-1">total permits</p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Fencing Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalFencing }}</p>
        <p class="text-xs text-muted-foreground mt-1">total permits</p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Signage Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalSignage }}</p>
        <p class="text-xs text-muted-foreground mt-1">total permits</p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Electrical Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalElectrical }}</p>
        <p class="text-xs text-muted-foreground mt-1">total permits</p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Electronic Permits</p>
        <p class="text-2xl font-bold mt-1">{{ totalElectronic }}</p>
        <p class="text-xs text-muted-foreground mt-1">total permits</p>
      </div>
      <div class="rounded-xl border bg-card p-4 shadow-sm">
        <p class="text-sm text-muted-foreground">Peak Month</p>
        <p class="text-2xl font-bold mt-1">{{ bestMonth.month }}</p>
        <p class="text-xs text-muted-foreground mt-1">
          {{
            bestMonth.building +
            bestMonth.occupancy +
            bestMonth.indigenous +
            bestMonth.fencing +
            bestMonth.signage +
            bestMonth.tempSignage +
            bestMonth.electrical +
            bestMonth.electronic +
            bestMonth.excavation +
            bestMonth.demolition +
            bestMonth.mechanical
          }}
          total permits
        </p>
      </div>
    </div>

    <!-- Bar Chart Card -->
    <div class="rounded-xl border bg-card p-6 shadow-sm">
      <div class="mb-4">
        <h3 class="text-lg font-semibold">Monthly Permits Distribution</h3>
        <p class="text-sm text-muted-foreground">Permits by type comparison</p>
      </div>

      <!-- Chart.js Bar Chart -->
      <div class="w-full h-96">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>
