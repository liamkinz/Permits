import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import {
  FileText,
  Clock,
  CheckCircle,
  Bell,
  FolderOpen,
  Plus,
  TrendingUp,
  AlertCircle,
} from 'lucide-vue-next'

export function useHomePage() {
  const authStore = useAuthStore()

  const stats = computed(() => [
    {
      label: 'Total Permits',
      value: '24',
      icon: FileText,
      trend: '+3 this month',
      color: 'text-blue-500',
    },
    {
      label: 'Pending Review',
      value: '7',
      icon: Clock,
      trend: '2 need attention',
      color: 'text-amber-500',
    },
    {
      label: 'Approved',
      value: '15',
      icon: CheckCircle,
      trend: '+5 this week',
      color: 'text-emerald-500',
    },
    {
      label: 'Expiring Soon',
      value: '2',
      icon: AlertCircle,
      trend: 'Within 30 days',
      color: 'text-red-500',
    },
  ])

  const recentPermits = computed(() => [
    {
      id: 'PRM-2026-001',
      type: 'Business License',
      status: 'Approved',
      date: 'Mar 8, 2026',
      statusColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
    },
    {
      id: 'PRM-2026-002',
      type: 'Building Permit',
      status: 'Pending',
      date: 'Mar 7, 2026',
      statusColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
    },
    {
      id: 'PRM-2026-003',
      type: 'Fire Safety',
      status: 'In Review',
      date: 'Mar 5, 2026',
      statusColor: 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
    },
    {
      id: 'PRM-2026-004',
      type: 'Zoning Permit',
      status: 'Approved',
      date: 'Mar 3, 2026',
      statusColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
    },
    {
      id: 'PRM-2026-005',
      type: 'Health Permit',
      status: 'Rejected',
      date: 'Mar 1, 2026',
      statusColor: 'bg-red-500/15 text-red-700 dark:text-red-400',
    },
  ])

  const quickActions = computed(() => [
    { label: 'New Permit Application', icon: Plus, description: 'Start a new permit request' },
    {
      label: 'Track Application',
      icon: TrendingUp,
      description: 'Check your application status',
    },
    { label: 'View All Permits', icon: FolderOpen, description: 'Browse your permit history' },
    { label: 'Notifications', icon: Bell, description: 'View alerts and updates' },
  ])

  return {
    authStore,
    stats,
    recentPermits,
    quickActions,
  }
}
