import type { DefineComponent } from 'vue'

export interface StatItem {
  label: string
  value: string
  icon: DefineComponent
  trend: string
  color: string
}

export interface RecentPermit {
  id: string
  type: string
  status: string
  date: string
  statusColor: string
}

export interface QuickAction {
  label: string
  icon: DefineComponent
  description: string
}
