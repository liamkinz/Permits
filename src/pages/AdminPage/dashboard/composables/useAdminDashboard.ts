import { ref, computed } from 'vue'
import { AlertCircle, AlertTriangle, CheckCircle, Clock } from 'lucide-vue-next'
import type {
  PermitStatus,
  DashboardStats,
  RecentApplication,
  StatusDistribution,
  Application,
} from '../types/admin-dashboard.types'
import App from '@/App.vue'

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
  const statusDistribution = computed<StatusDistribution[]>(() => [
    {
      status: 'Pending',
      count: dashboardStats.value.pendingReview,
      color: STATUS_DISTRIBUTION_COLORS['Pending'] || 'bg-gray-500',
    },
    {
      status: 'Under Review',
      count: dashboardStats.value.underReview,
      color: STATUS_DISTRIBUTION_COLORS['Under Review'] || 'bg-gray-500',
    },
    {
      status: 'Deficiency',
      count: dashboardStats.value.deficiencyFound,
      color: STATUS_DISTRIBUTION_COLORS['Deficiency'] || 'bg-gray-500',
    },
    {
      status: 'Approved',
      count: dashboardStats.value.approved,
      color: STATUS_DISTRIBUTION_COLORS['Approved'] || 'bg-gray-500',
    },
  ])

  // Sorted applications - most recent first
  const sortedApplications = computed(() => {
    return [...recentApplications.value]
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 5)
  })

  // Max count for status distribution chart scaling
  const maxCount = computed(() => {
    return Math.max(...statusDistribution.value.map((s) => s.count), 1)
  })

  // Helper function to compute days ago from timestamp
  const getDaysAgo = (timestamp: string): number => {
    const days = Math.floor((Date.now() - new Date(timestamp).getTime()) / (24 * 60 * 60 * 1000))
    return Math.max(days, 0)
  }

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

  const applications = ref<Application[]>([
    {
      id: 'APP-001',
      applicantName: 'John Doe',
      permitType: 'Building Permit',
      submittedDate: '2026-04-11',
      dueDate: '2026-05-10',
      daysRemaining: 10,
    },
    {
      id: 'APP-002',
      applicantName: 'Jane Smith',
      permitType: 'Land Use Permit',
      submittedDate: '2026-04-05',
      dueDate: '2026-05-05',
      daysRemaining: 7,
    },
    {
      id: 'APP-003',
      applicantName: 'Mike Johnson',
      permitType: 'Environmental Permit',
      submittedDate: '2026-04-08',
      dueDate: '2026-05-05',
      daysRemaining: 6,
    },
    {
      id: 'APP-004',
      applicantName: 'Sarah Williams',
      permitType: 'Building Permit',
      submittedDate: '2026-04-12',
      dueDate: '2026-05-02',
      daysRemaining: 4,
    },
    {
      id: 'APP-005',
      applicantName: 'Robert Brown',
      permitType: 'Industrial Permit',
      submittedDate: '2026-04-13',
      dueDate: '2026-04-28',
      daysRemaining: 3,
    },
  ])

  const getStatusColorOngoing = (daysRemaining: number) => {
    if (daysRemaining >= 7) {
      return 'bg-destructive/20 text-destructive hover:bg-destructive/30'
    } else if (daysRemaining === 6) {
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400'
    } else if (daysRemaining >= 3 && daysRemaining <= 5) {
      return 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
    } else {
      return 'bg-destructive/20 text-destructive hover:bg-destructive/30'
    }
  }

  const getStatusLabel = (daysRemaining: number) => {
    if (daysRemaining >= 7) {
      return 'Overdue'
    } else if (daysRemaining === 6) {
      return 'Warning'
    } else if (daysRemaining >= 3 && daysRemaining <= 5) {
      return 'Safe'
    } else {
      return 'Critical'
    }
  }

  // Get status icon component based on days remaining
  const getStatusIcon = (daysRemaining: number) => {
    if (daysRemaining >= 7) {
      return AlertCircle
    } else if (daysRemaining === 6) {
      return Clock
    } else if (daysRemaining >= 3 && daysRemaining <= 5) {
      return CheckCircle
    } else {
      return AlertTriangle
    }
  }

  // Calculate days elapsed from submitted date
  const getDaysElapsed = (submittedDate: string): number => {
    const days = Math.floor(
      (Date.now() - new Date(submittedDate).getTime()) / (24 * 60 * 60 * 1000),
    )
    return Math.max(days, 0)
  }

  return {
    recentApplications,
    dashboardStats,
    statusDistribution,
    sortedApplications,
    maxCount,
    approvalRate,
    avgProcessingTime,
    applications,
    getDaysAgo,
    getDaysElapsed,
    getStatusColor,
    formatStatus,
    getStatusColorOngoing,
    getStatusLabel,
    getStatusIcon,
  }
}
