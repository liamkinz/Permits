<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// ─── Theme Colors from CSS ─────────────────────────────────────────────────────
const themeColors = ref({
  chart1: '#3b82f6',
  chart2: '#ef4444',
  chart3: '#10b981',
  chart4: '#f59e0b',
  chart1Border: '#2563eb',
  chart2Border: '#dc2626',
  chart3Border: '#059669',
  chart4Border: '#d97706',
})

// Get theme colors from CSS variables
onMounted(() => {
  const root = document.documentElement
  const computedStyle = getComputedStyle(root)

  // Using CSS variables from style.css with oklch format
  themeColors.value = {
    chart1: computedStyle.getPropertyValue('--chart-1')?.trim() || '#3b82f6',
    chart2: computedStyle.getPropertyValue('--chart-2')?.trim() || '#ef4444',
    chart3: computedStyle.getPropertyValue('--chart-3')?.trim() || '#10b981',
    chart4: computedStyle.getPropertyValue('--chart-4')?.trim() || '#f59e0b',
    chart1Border: '#2563eb',
    chart2Border: '#dc2626',
    chart3Border: '#059669',
    chart4Border: '#d97706',
  }
})

// ─── Data ─────────────────────────────────────────────────────────────────────
const permitsData = ref([
  { month: 'January', building: 45, occupancy: 32, indigenous: 18, other: 25 },
  { month: 'February', building: 52, occupancy: 38, indigenous: 22, other: 28 },
  { month: 'March', building: 48, occupancy: 35, indigenous: 20, other: 30 },
  { month: 'April', building: 61, occupancy: 42, indigenous: 28, other: 35 },
  { month: 'May', building: 55, occupancy: 40, indigenous: 25, other: 32 },
  { month: 'June', building: 58, occupancy: 44, indigenous: 26, other: 38 },
  { month: 'July', building: 67, occupancy: 50, indigenous: 32, other: 42 },
  { month: 'August', building: 62, occupancy: 46, indigenous: 28, other: 36 },
  { month: 'September', building: 54, occupancy: 39, indigenous: 24, other: 33 },
  { month: 'October', building: 70, occupancy: 52, indigenous: 35, other: 44 },
  { month: 'November', building: 73, occupancy: 55, indigenous: 38, other: 48 },
  { month: 'December', building: 68, occupancy: 51, indigenous: 36, other: 45 },
])

// ─── Chart Config ─────────────────────────────────────────────────────────────
const chartData = computed(() => ({
  labels: permitsData.value.map((d) => d.month),
  datasets: [
    {
      label: 'Building Permits',
      data: permitsData.value.map((d) => d.building),
      backgroundColor: themeColors.value.chart1,
      borderWidth: 0,
    },
    {
      label: 'Occupancy Permits',
      data: permitsData.value.map((d) => d.occupancy),
      backgroundColor: themeColors.value.chart2,
      borderWidth: 0,
    },
    {
      label: 'Indigenous Permits',
      data: permitsData.value.map((d) => d.indigenous),
      backgroundColor: themeColors.value.chart3,
      borderWidth: 0,
    },
    {
      label: 'Other Permits',
      data: permitsData.value.map((d) => d.other),
      backgroundColor: themeColors.value.chart4,
      borderWidth: 0,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        padding: 15,
        usePointStyle: true,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}))

// ─── Computed Stats ───────────────────────────────────────────────────────────
const totalBuilding = computed(() => permitsData.value.reduce((sum, d) => sum + d.building, 0))
const totalOccupancy = computed(() => permitsData.value.reduce((sum, d) => sum + d.occupancy, 0))
const totalIndigenous = computed(() => permitsData.value.reduce((sum, d) => sum + d.indigenous, 0))
const totalOther = computed(() => permitsData.value.reduce((sum, d) => sum + d.other, 0))
const bestMonth = computed(() =>
  permitsData.value.reduce((best, d) =>
    d.building + d.occupancy + d.indigenous + d.other >
    best.building + best.occupancy + best.indigenous + best.other
      ? d
      : best,
  ),
)
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold tracking-tight">Permits Overview</h2>
      <p class="text-sm text-muted-foreground mt-1">
        Monthly breakdown of permits by type for 2024
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
        <p class="text-sm text-muted-foreground">Peak Month</p>
        <p class="text-2xl font-bold mt-1">{{ bestMonth.month }}</p>
        <p class="text-xs text-muted-foreground mt-1">
          {{ bestMonth.building + bestMonth.occupancy + bestMonth.indigenous + bestMonth.other }}
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
