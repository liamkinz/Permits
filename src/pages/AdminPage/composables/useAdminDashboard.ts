import { ref, computed } from 'vue'

// Type definitions
export type PermitStatus =
  | 'pending'
  | 'under_review'
  | 'deficiency_found'
  | 'for_payment'
  | 'approved'
export type SubmissionClass = 'new_entry' | 're_entry' | 'for_approval'

export interface PermitApplication {
  id: string
  applicantId: string
  submissionClass: SubmissionClass
  projectDescription: string
  location: string
  status: PermitStatus
  documents: unknown[]
  evaluations: unknown[]
  remarks?: string
  submittedAt: string
  updatedAt: string
}

interface DashboardStats {
  totalApplications: number
  pendingReview: number
  underReview: number
  approved: number
  deficiencyFound: number
}

interface RecentApplication extends PermitApplication {
  applicantName: string
}

// Status color mapping constant - single source of truth
const STATUS_COLOR_MAP: Record<PermitStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  under_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  deficiency_found: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  for_payment: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
}

const STATUS_DISTRIBUTION_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-500',
  'Under Review': 'bg-blue-500',
  Deficiency: 'bg-red-500',
  Approved: 'bg-green-500',
}

export function useAdminDashboard() {
  // Sample data
  const recentApplications = ref<RecentApplication[]>([
    {
      id: '1',
      applicantId: 'user-001',
      applicantName: 'John Smith',
      submissionClass: 'new_entry',
      projectDescription: 'Residential Building Construction',
      location: '123 Main Street',
      status: 'under_review',
      documents: [],
      evaluations: [],
      remarks: 'Structural review in progress',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      applicantId: 'user-002',
      applicantName: 'Sarah Johnson',
      submissionClass: 're_entry',
      projectDescription: 'Commercial Office Space',
      location: '456 Oak Avenue',
      status: 'deficiency_found',
      documents: [],
      evaluations: [],
      remarks: 'Awaiting applicant corrections',
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      applicantId: 'user-003',
      applicantName: 'Mike Davis',
      submissionClass: 'for_approval',
      projectDescription: 'Industrial Warehouse',
      location: '789 Industrial Blvd',
      status: 'for_payment',
      documents: [],
      evaluations: [],
      remarks: 'Ready for final approval',
      submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '4',
      applicantId: 'user-004',
      applicantName: 'Emily Wilson',
      submissionClass: 'new_entry',
      projectDescription: 'Retail Shopping Center',
      location: '321 Commerce Drive',
      status: 'pending',
      documents: [],
      evaluations: [],
      remarks: 'Initial document review',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '5',
      applicantId: 'user-005',
      applicantName: 'Robert Brown',
      submissionClass: 'new_entry',
      projectDescription: 'Apartment Complex',
      location: '654 Residential Way',
      status: 'approved',
      documents: [],
      evaluations: [],
      remarks: 'Approved and completed',
      submittedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ])

  // Computed stats - single-pass reduce for efficiency
  const dashboardStats = computed<DashboardStats>(() => {
    return recentApplications.value.reduce(
      (stats, app) => ({
        totalApplications: stats.totalApplications + 1,
        pendingReview: stats.pendingReview + (app.status === 'pending' ? 1 : 0),
        underReview: stats.underReview + (app.status === 'under_review' ? 1 : 0),
        approved: stats.approved + (app.status === 'approved' ? 1 : 0),
        deficiencyFound: stats.deficiencyFound + (app.status === 'deficiency_found' ? 1 : 0),
      }),
      { totalApplications: 0, pendingReview: 0, underReview: 0, approved: 0, deficiencyFound: 0 },
    )
  })

  // Status distribution for charts
  const statusDistribution = computed(() => [
    {
      status: 'Pending',
      count: dashboardStats.value.pendingReview,
      color: STATUS_DISTRIBUTION_COLORS['Pending'],
    },
    {
      status: 'Under Review',
      count: dashboardStats.value.underReview,
      color: STATUS_DISTRIBUTION_COLORS['Under Review'],
    },
    {
      status: 'Deficiency',
      count: dashboardStats.value.deficiencyFound,
      color: STATUS_DISTRIBUTION_COLORS['Deficiency'],
    },
    {
      status: 'Approved',
      count: dashboardStats.value.approved,
      color: STATUS_DISTRIBUTION_COLORS['Approved'],
    },
  ])

  // Approval rate
  const approvalRate = computed(() => {
    const total = dashboardStats.value.totalApplications
    if (total === 0) return 0
    return Math.round((dashboardStats.value.approved / total) * 100)
  })

  // Average processing time in days - computed from timestamps
  const avgProcessingTime = computed(() => {
    if (recentApplications.value.length === 0) return 0
    const totalDays = recentApplications.value.reduce((sum, app) => {
      const days = Math.floor(
        (Date.now() - new Date(app.submittedAt).getTime()) / (24 * 60 * 60 * 1000),
      )
      return sum + days
    }, 0)
    return Math.round(totalDays / recentApplications.value.length)
  })

  // Get status color for badge - type-safe with PermitStatus
  const getStatusColor = (status: PermitStatus): string => {
    return STATUS_COLOR_MAP[status] || STATUS_COLOR_MAP.pending
  }

  // Format status display - type-safe with PermitStatus
  const formatStatus = (status: PermitStatus): string => {
    return status.replace(/_/g, ' ').toUpperCase()
  }

  return {
    recentApplications,
    dashboardStats,
    statusDistribution,
    approvalRate,
    avgProcessingTime,
    getStatusColor,
    formatStatus,
  }
}
