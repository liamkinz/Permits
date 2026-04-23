<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { usePieCharts } from '../composables/usePieCharts'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

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
      <div class="w-full h-80">
        <Pie :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>
