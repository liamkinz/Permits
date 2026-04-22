import { ref, computed, onMounted } from 'vue'
import type { PermitData, ThemeColors, ChartConfig } from '../types/barchart.types'

export function useBarCharts() {
  // ─── Theme Colors from CSS ─────────────────────────────────────────────────────
  const themeColors = ref<ThemeColors>({
    chart1: 'oklch(0.86 0.17 92)',
    chart2: 'oklch(0.76 0.16 56)',
    chart3: 'oklch(0.87 0.01 286)',
    chart4: 'oklch(0.73 0.18 350)',
    chart5: 'oklch(76.86% 0.16167 113.609)',
    chart6: 'oklch(0.457 0.24 277.023)',
    chart7: 'oklch(0.71 0.14 255)',
    chart8: 'oklch(0.8 0.18 152)',
    chart9: 'oklch(0.7 0.1 44)',
    chart10: 'oklch(0.4927 0.0662 44)',
    chart11: 'oklch(0.6 0.12 200)',
  })

  // Get theme colors from CSS variables
  onMounted(() => {
    const root = document.documentElement
    const computedStyle = getComputedStyle(root)

    // Using CSS variables from style.css with oklch format
    themeColors.value = {
      chart1: computedStyle.getPropertyValue('--chart-1')?.trim() || 'oklch(0.86 0.17 92)',
      chart2: computedStyle.getPropertyValue('--chart-2')?.trim() || 'oklch(0.76 0.16 56)',
      chart3: computedStyle.getPropertyValue('--chart-3')?.trim() || 'oklch(0.87 0.01 286)',
      chart4: computedStyle.getPropertyValue('--chart-4')?.trim() || 'oklch(0.73 0.18 350)',
      chart5:
        computedStyle.getPropertyValue('--chart-5')?.trim() || 'oklch(76.86% 0.16167 113.609)',
      chart6: computedStyle.getPropertyValue('--chart-6')?.trim() || 'oklch(0.457 0.24 277.023)',
      chart7: computedStyle.getPropertyValue('--chart-7')?.trim() || 'oklch(0.71 0.14 255)',
      chart8: computedStyle.getPropertyValue('--chart-8')?.trim() || 'oklch(0.8 0.18 152)',
      chart9: computedStyle.getPropertyValue('--chart-9')?.trim() || 'oklch(0.7 0.1 44)',
      chart10: computedStyle.getPropertyValue('--chart-10')?.trim() || 'oklch(0.4927 0.0662 44)',
      chart11: computedStyle.getPropertyValue('--chart-11')?.trim() || 'oklch(0.6 0.12 200)',
    }
  })

  // ─── Data ─────────────────────────────────────────────────────────────────────
  const permitsData = ref<PermitData[]>([
    {
      month: 'January',
      building: 45,
      occupancy: 32,
      indigenous: 18,
      fencing: 25,
      signage: 12,
      tempSignage: 8,
      electrical: 15,
      electronic: 10,
      excavation: 5,
      demolition: 3,
      mechanical: 7,
    },
    {
      month: 'February',
      building: 52,
      occupancy: 38,
      indigenous: 22,
      fencing: 28,
      signage: 14,
      tempSignage: 9,
      electrical: 18,
      electronic: 12,
      excavation: 6,
      demolition: 4,
      mechanical: 8,
    },
    {
      month: 'March',
      building: 48,
      occupancy: 35,
      indigenous: 20,
      fencing: 30,
      signage: 16,
      tempSignage: 10,
      electrical: 20,
      electronic: 14,
      excavation: 7,
      demolition: 3,
      mechanical: 9,
    },
    {
      month: 'April',
      building: 61,
      occupancy: 42,
      indigenous: 28,
      fencing: 35,
      signage: 18,
      tempSignage: 11,
      electrical: 22,
      electronic: 16,
      excavation: 8,
      demolition: 5,
      mechanical: 10,
    },
    {
      month: 'May',
      building: 55,
      occupancy: 40,
      indigenous: 25,
      fencing: 32,
      signage: 15,
      tempSignage: 10,
      electrical: 19,
      electronic: 13,
      excavation: 7,
      demolition: 4,
      mechanical: 9,
    },
    {
      month: 'June',
      building: 58,
      occupancy: 44,
      indigenous: 26,
      fencing: 38,
      signage: 17,
      tempSignage: 12,
      electrical: 21,
      electronic: 15,
      excavation: 9,
      demolition: 5,
      mechanical: 11,
    },
    {
      month: 'July',
      building: 67,
      occupancy: 50,
      indigenous: 32,
      fencing: 42,
      signage: 20,
      tempSignage: 14,
      electrical: 25,
      electronic: 18,
      excavation: 10,
      demolition: 6,
      mechanical: 12,
    },
    {
      month: 'August',
      building: 62,
      occupancy: 46,
      indigenous: 28,
      fencing: 36,
      signage: 19,
      tempSignage: 13,
      electrical: 23,
      electronic: 16,
      excavation: 9,
      demolition: 5,
      mechanical: 11,
    },
    {
      month: 'September',
      building: 54,
      occupancy: 39,
      indigenous: 24,
      fencing: 33,
      signage: 16,
      tempSignage: 11,
      electrical: 20,
      electronic: 14,
      excavation: 8,
      demolition: 4,
      mechanical: 10,
    },
    {
      month: 'October',
      building: 70,
      occupancy: 52,
      indigenous: 35,
      fencing: 44,
      signage: 21,
      tempSignage: 15,
      electrical: 26,
      electronic: 19,
      excavation: 11,
      demolition: 7,
      mechanical: 13,
    },
    {
      month: 'November',
      building: 73,
      occupancy: 55,
      indigenous: 38,
      fencing: 48,
      signage: 23,
      tempSignage: 16,
      electrical: 28,
      electronic: 20,
      excavation: 12,
      demolition: 8,
      mechanical: 14,
    },
    {
      month: 'December',
      building: 68,
      occupancy: 51,
      indigenous: 36,
      fencing: 45,
      signage: 22,
      tempSignage: 15,
      electrical: 27,
      electronic: 19,
      excavation: 11,
      demolition: 7,
      mechanical: 13,
    },
  ])

  // ─── Chart Config ─────────────────────────────────────────────────────────────
  const chartData = computed<ChartConfig>(() => ({
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
        label: 'Fencing Permits',
        data: permitsData.value.map((d) => d.fencing),
        backgroundColor: themeColors.value.chart4,
        borderWidth: 0,
      },
      {
        label: 'Signage Permits',
        data: permitsData.value.map((d) => d.signage),
        backgroundColor: themeColors.value.chart5,
        borderWidth: 0,
      },
      {
        label: 'Temp. Signage Permits',
        data: permitsData.value.map((d) => d.tempSignage),
        backgroundColor: themeColors.value.chart6,
        borderWidth: 0,
      },
      {
        label: 'Electrical Permits',
        data: permitsData.value.map((d) => d.electrical),
        backgroundColor: themeColors.value.chart7,
        borderWidth: 0,
      },
      {
        label: 'Electronic Permits',
        data: permitsData.value.map((d) => d.electronic),
        backgroundColor: themeColors.value.chart8,
        borderWidth: 0,
      },
      {
        label: 'Excavation Permits',
        data: permitsData.value.map((d) => d.excavation),
        backgroundColor: themeColors.value.chart9,
        borderWidth: 0,
      },
      {
        label: 'Demolition Permits',
        data: permitsData.value.map((d) => d.demolition),
        backgroundColor: themeColors.value.chart10,
        borderWidth: 0,
      },
      {
        label: 'Mechanical Permits',
        data: permitsData.value.map((d) => d.mechanical),
        backgroundColor: themeColors.value.chart11,
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
  const totalIndigenous = computed(() =>
    permitsData.value.reduce((sum, d) => sum + d.indigenous, 0),
  )
  const totalFencing = computed(() => permitsData.value.reduce((sum, d) => sum + d.fencing, 0))
  const totalSignage = computed(() => permitsData.value.reduce((sum, d) => sum + d.signage, 0))
  const totalTempSignage = computed(() =>
    permitsData.value.reduce((sum, d) => sum + d.tempSignage, 0),
  )
  const totalElectrical = computed(() =>
    permitsData.value.reduce((sum, d) => sum + d.electrical, 0),
  )
  const totalElectronic = computed(() =>
    permitsData.value.reduce((sum, d) => sum + d.electronic, 0),
  )
  const totalExcavation = computed(() =>
    permitsData.value.reduce((sum, d) => sum + d.excavation, 0),
  )
  const totalDemolition = computed(() =>
    permitsData.value.reduce((sum, d) => sum + d.demolition, 0),
  )
  const totalMechanical = computed(() =>
    permitsData.value.reduce((sum, d) => sum + d.mechanical, 0),
  )

  const bestMonth = computed(() =>
    permitsData.value.reduce((best, d) => {
      const bestTotal =
        best.building +
        best.occupancy +
        best.indigenous +
        best.fencing +
        best.signage +
        best.tempSignage +
        best.electrical +
        best.electronic +
        best.excavation +
        best.demolition +
        best.mechanical
      const dTotal =
        d.building +
        d.occupancy +
        d.indigenous +
        d.fencing +
        d.signage +
        d.tempSignage +
        d.electrical +
        d.electronic +
        d.excavation +
        d.demolition +
        d.mechanical
      return dTotal > bestTotal ? d : best
    }),
  )

  return {
    themeColors,
    permitsData,
    chartData,
    chartOptions,
    totalBuilding,
    totalOccupancy,
    totalIndigenous,
    totalFencing,
    totalSignage,
    totalTempSignage,
    totalElectrical,
    totalElectronic,
    totalExcavation,
    totalDemolition,
    totalMechanical,
    bestMonth,
  }
}
