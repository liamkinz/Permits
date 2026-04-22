export interface PermitData {
  month: string
  building: number
  occupancy: number
  indigenous: number
  fencing: number
  signage: number
  tempSignage: number
  electrical: number
  electronic: number
  excavation: number
  demolition: number
  mechanical: number
}

export interface ThemeColors {
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
  chart6: string
  chart7: string
  chart8: string
  chart9: string
  chart10: string
  chart11: string
}

export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor: string
  borderWidth: number
}

export interface ChartConfig {
  labels: string[]
  datasets: ChartDataset[]
}
