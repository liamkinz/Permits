export function useHeroSection() {
  const stats = [
    { value: '50K+', label: 'Permits Processed' },
    { value: '1,200+', label: 'Businesses Served' },
    { value: '98%', label: 'Approval Rate' },
    { value: '< 24h', label: 'Avg. Turnaround' },
  ]

  const dashboardStats = [
    { label: 'Active Permits', value: '24', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Pending Review', value: '7', color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Approved Today', value: '3', color: 'text-green-600 dark:text-green-400' },
  ]

  const recentPermits = [
    {
      id: 'PRM-2024-001',
      type: 'Building Permit',
      status: 'Approved',
      badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    },
    {
      id: 'PRM-2024-002',
      type: 'Zoning Variance',
      status: 'In Review',
      badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    },
    {
      id: 'PRM-2024-003',
      type: 'Sign Permit',
      status: 'Submitted',
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    },
  ]

  return { stats, dashboardStats, recentPermits }
}
