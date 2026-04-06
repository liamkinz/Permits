import { ref, computed } from 'vue'
import type { Component } from 'vue'
import {
  Clock,
  Search,
  AlertTriangle,
  CreditCard,
  CheckCircle2,
} from 'lucide-vue-next'

// Type definitions
export type PermitStatus =
  | 'pending'
  | 'under_review'
  | 'deficiency_found'
  | 'for_payment'
  | 'approved'
export type SubmissionClass = 'new_entry' | 're_entry' | 'for_approval'
export type PermitType = 'building_permit' | 'occupancy_permit' | 'sign_permit'
export type SortField = 'submittedAt' | 'projectDescription' | 'applicantName' | 'status'

export interface PermitApplication {
  id: string
  applicantId: string
  applicantName: string
  submitType: PermitType
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

// Status options for filter buttons
export const statusOptions: PermitStatus[] = [
  'pending',
  'under_review',
  'deficiency_found',
  'for_payment',
  'approved',
]

// Helper to get days ago
export const getDaysAgo = (timestamp: string): number => {
  const days = Math.floor((Date.now() - new Date(timestamp).getTime()) / (24 * 60 * 60 * 1000))
  return Math.max(days, 0)
}

// Status color mapping constant
const STATUS_COLOR_MAP: Record<PermitStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  under_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  deficiency_found: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  for_payment: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
}

// Permit type color mapping
const PERMIT_TYPE_COLOR_MAP: Record<PermitType, string> = {
  building_permit: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
  occupancy_permit: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100',
  sign_permit: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100',
}

// Status card color maps
export const statusCardColors: Record<PermitStatus, string> = {
  pending:
    'border-amber-200 bg-amber-50/60 hover:border-amber-300 dark:bg-amber-950/20 dark:border-amber-800',
  under_review:
    'border-blue-200 bg-blue-50/60 hover:border-blue-300 dark:bg-blue-950/20 dark:border-blue-800',
  deficiency_found:
    'border-rose-200 bg-rose-50/60 hover:border-rose-300 dark:bg-rose-950/20 dark:border-rose-800',
  for_payment:
    'border-violet-200 bg-violet-50/60 hover:border-violet-300 dark:bg-violet-950/20 dark:border-violet-800',
  approved:
    'border-emerald-200 bg-emerald-50/60 hover:border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800',
}

export const statusCardLabelColors: Record<PermitStatus, string> = {
  pending: 'text-amber-700 dark:text-amber-400',
  under_review: 'text-blue-700 dark:text-blue-400',
  deficiency_found: 'text-rose-700 dark:text-rose-400',
  for_payment: 'text-violet-700 dark:text-violet-400',
  approved: 'text-emerald-700 dark:text-emerald-400',
}

export const statusCardCountColors: Record<PermitStatus, string> = {
  pending: 'text-amber-800 dark:text-amber-300',
  under_review: 'text-blue-800 dark:text-blue-300',
  deficiency_found: 'text-rose-800 dark:text-rose-300',
  for_payment: 'text-violet-800 dark:text-violet-300',
  approved: 'text-emerald-800 dark:text-emerald-300',
}

export const statusCardIcons: Record<PermitStatus, Component> = {
  pending: Clock,
  under_review: Search,
  deficiency_found: AlertTriangle,
  for_payment: CreditCard,
  approved: CheckCircle2,
}

export function useAdminPermits() {
  // Sample permit data - 10 items (oldest to latest)
  const permits = ref<PermitApplication[]>([
    {
      id: 'PRM-2026-001',
      applicantId: 'user-001',
      applicantName: 'John Smith',
      submitType: 'building_permit',
      submissionClass: 'new_entry',
      projectDescription: 'Residential Building Construction',
      location: '123 Main Street, Downtown',
      status: 'under_review',
      documents: [{ id: 'doc-1', name: 'site_plan.pdf' }],
      evaluations: [],
      remarks: 'Structural and electrical evaluations pending',
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2026-002',
      applicantId: 'user-002',
      applicantName: 'Sarah Johnson',
      submitType: 'occupancy_permit',
      submissionClass: 're_entry',
      projectDescription: 'Commercial Office Space - Phase 2',
      location: '456 Oak Avenue, Business District',
      status: 'deficiency_found',
      documents: [{ id: 'doc-2', name: 'structural_plan.pdf' }],
      evaluations: [],
      remarks: 'Applicant to submit revised electrical plans',
      submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2026-003',
      applicantId: 'user-003',
      applicantName: 'Mike Davis',
      submitType: 'sign_permit',
      submissionClass: 'for_approval',
      projectDescription: 'Industrial Warehouse Complex',
      location: '789 Industrial Blvd, Manufacturing Zone',
      status: 'for_payment',
      documents: [{ id: 'doc-3', name: 'permit_id.pdf' }],
      evaluations: [],
      remarks: 'All evaluations completed successfully',
      submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2026-004',
      applicantId: 'user-004',
      applicantName: 'Emily Wilson',
      submitType: 'building_permit',
      submissionClass: 'new_entry',
      projectDescription: 'Retail Shopping Center Expansion',
      location: '321 Commerce Drive, Retail Hub',
      status: 'pending',
      documents: [],
      evaluations: [],
      remarks: 'Awaiting initial document verification',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2026-005',
      applicantId: 'user-005',
      applicantName: 'Robert Brown',
      submitType: 'occupancy_permit',
      submissionClass: 'new_entry',
      projectDescription: 'Residential Apartment Complex',
      location: '654 Residential Way, Heights',
      status: 'approved',
      documents: [],
      evaluations: [],
      remarks: 'Project approved and ready for issuance',
      submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2026-006',
      applicantId: 'user-006',
      applicantName: 'Jennifer Lee',
      submitType: 'sign_permit',
      submissionClass: 're_entry',
      projectDescription: 'Restaurant and Bar Renovation',
      location: '987 Food Street, Downtown',
      status: 'under_review',
      documents: [{ id: 'doc-6', name: 'floor_plan.pdf' }],
      evaluations: [],
      remarks: 'Sanitary and safety reviews in progress',
      submittedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2026-007',
      applicantId: 'user-007',
      applicantName: 'David Martinez',
      submitType: 'building_permit',
      submissionClass: 'new_entry',
      projectDescription: 'Healthcare Clinic Expansion',
      location: '111 Medical Plaza, Healthcare District',
      status: 'pending',
      documents: [],
      evaluations: [],
      remarks: 'Initial submission received',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2026-008',
      applicantId: 'user-008',
      applicantName: 'Lisa Anderson',
      submitType: 'occupancy_permit',
      submissionClass: 'for_approval',
      projectDescription: 'Educational Building - Library',
      location: '222 Campus Road, University',
      status: 'for_payment',
      documents: [],
      evaluations: [],
      remarks: 'Final verification complete',
      submittedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2026-009',
      applicantId: 'user-009',
      applicantName: 'James Wilson',
      submitType: 'sign_permit',
      submissionClass: 'new_entry',
      projectDescription: 'Mixed-Use Development Downtown',
      location: '555 Central Park, Midtown',
      status: 'under_review',
      documents: [{ id: 'doc-9', name: 'zoning_plan.pdf' }],
      evaluations: [],
      remarks: 'Environmental impact assessment in progress',
      submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2026-010',
      applicantId: 'user-010',
      applicantName: 'Margaret Chen',
      submitType: 'building_permit',
      submissionClass: 're_entry',
      projectDescription: 'Data Center Infrastructure Project',
      location: '777 Innovation Drive, Tech Park',
      status: 'approved',
      documents: [{ id: 'doc-10', name: 'infrastructure_plan.pdf' }],
      evaluations: [],
      remarks: 'All technical requirements verified',
      submittedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ])

  // Search and filter state
  const searchQuery = ref('')
  const selectedStatuses = ref<PermitStatus[]>([])
  const selectedSubmissionClass = ref<SubmissionClass | null>(null)
  const sortField = ref<SortField>('submittedAt')
  const sortOrder = ref<'asc' | 'desc'>('desc')
  const currentPage = ref(1)
  const itemsPerPage = 5

  // Computed filtered permits - single-pass reduce for efficiency
  const filteredPermits = computed(() => {
    return permits.value
      .filter((permit) => {
        // Search filter
        const query = searchQuery.value.toLowerCase()
        if (query) {
          const matchesSearch =
            permit.projectDescription.toLowerCase().includes(query) ||
            permit.applicantName.toLowerCase().includes(query) ||
            permit.location.toLowerCase().includes(query) ||
            permit.id.toLowerCase().includes(query)
          if (!matchesSearch) return false
        }

        // Status filter
        if (selectedStatuses.value.length > 0 && !selectedStatuses.value.includes(permit.status)) {
          return false
        }

        // Submission class filter
        if (
          selectedSubmissionClass.value &&
          permit.submissionClass !== selectedSubmissionClass.value
        ) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        let aValue: string | Date
        let bValue: string | Date

        switch (sortField.value) {
          case 'projectDescription':
            aValue = a.projectDescription
            bValue = b.projectDescription
            break
          case 'applicantName':
            aValue = a.applicantName
            bValue = b.applicantName
            break
          case 'status':
            aValue = a.status
            bValue = b.status
            break
          case 'submittedAt':
          default:
            aValue = new Date(a.submittedAt)
            bValue = new Date(b.submittedAt)
        }

        if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1
        if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1
        return 0
      })
  })

  // Computed paginated permits
  const totalPages = computed(() => Math.ceil(filteredPermits.value.length / itemsPerPage))

  const paginatedPermits = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredPermits.value.slice(start, end)
  })

  // Status distribution
  const statusStats = computed(() => {
    const stats: Record<PermitStatus, number> = {
      pending: 0,
      under_review: 0,
      deficiency_found: 0,
      for_payment: 0,
      approved: 0,
    }

    permits.value.forEach((permit) => {
      stats[permit.status]++
    })

    return stats
  })

  // Get status color
  const getStatusColor = (status: PermitStatus): string => {
    return STATUS_COLOR_MAP[status] || STATUS_COLOR_MAP.pending
  }

  // Format status display
  const formatStatus = (status: PermitStatus): string => {
    return status.replace(/_/g, ' ').toUpperCase()
  }

  // Format submission class
  const formatSubmissionClass = (submissionClass: SubmissionClass): string => {
    const map: Record<SubmissionClass, string> = {
      new_entry: 'New Entry',
      re_entry: 'Re-Entry',
      for_approval: 'For Approval',
    }
    return map[submissionClass]
  }

  // Format permit type
  const formatPermitType = (permitType: PermitType): string => {
    const map: Record<PermitType, string> = {
      building_permit: 'Building Permit',
      occupancy_permit: 'Occupancy Permit',
      sign_permit: 'Sign Permit',
    }
    return map[permitType]
  }

  // Get permit type color
  const getPermitTypeColor = (permitType: PermitType): string => {
    return PERMIT_TYPE_COLOR_MAP[permitType] || PERMIT_TYPE_COLOR_MAP.building_permit
  }

  // Helper to get status badge label with count
  const getStatusBadgeLabel = (status: PermitStatus): string => {
    const statusLabel = formatStatus(status)
    const count = statusStats.value[status]
    return `${statusLabel} (${count})`
  }

  // Toggle sort order
  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

  // Check if any filters are active
  const hasActiveFilters = computed(
    () => searchQuery.value || selectedStatuses.value.length > 0 || selectedSubmissionClass.value,
  )

  // Clear all filters
  const clearFilters = () => {
    searchQuery.value = ''
    selectedStatuses.value = []
    selectedSubmissionClass.value = null
    currentPage.value = 1
  }

  // Pagination methods
  const goToPage = (page: number) => {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value))
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  // Toggle status filter
  const toggleStatusFilter = (status: PermitStatus) => {
    const index = selectedStatuses.value.indexOf(status)
    if (index > -1) {
      selectedStatuses.value.splice(index, 1)
    } else {
      selectedStatuses.value.push(status)
    }
  }

  return {
    permits,
    filteredPermits,
    paginatedPermits,
    currentPage,
    totalPages,
    searchQuery,
    selectedStatuses,
    selectedSubmissionClass,
    sortField,
    sortOrder,
    statusStats,
    getStatusColor,
    formatStatus,
    formatSubmissionClass,
    formatPermitType,
    getPermitTypeColor,
    getStatusBadgeLabel,
    toggleSortOrder,
    hasActiveFilters,
    clearFilters,
    toggleStatusFilter,
    goToPage,
    nextPage,
    prevPage,
  }
}
