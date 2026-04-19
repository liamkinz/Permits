import { ref, computed } from 'vue'
import type {
  InProgressApplication,
  InProgressStatus,
  ProgressStats,
  PermitType,
  PermitStatus,
} from '../types/inprogress.types'

// Helper to get days ago
export const getDaysAgo = (timestamp: string): number => {
  const days = Math.floor((Date.now() - new Date(timestamp).getTime()) / (24 * 60 * 60 * 1000))
  return Math.max(days, 0)
}

// Status color mapping constant
export const STATUS_COLOR_MAP: Record<PermitStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  under_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  deficiency_found: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  for_payment: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
}

// Permit type color mapping
export const PERMIT_TYPE_COLOR_MAP: Record<PermitType, string> = {
  building_permit: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
  occupancy_permit: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100',
  sign_permit: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100',
}

export function useInProgressApplications() {
  const searchQuery = ref('')
  const selectedStatuses = ref<InProgressStatus[]>([])
  const sortField = ref<'submittedAt' | 'projectDescription' | 'applicantName'>('submittedAt')
  const sortOrder = ref<'asc' | 'desc'>('desc')
  const currentPage = ref(1)
  const itemsPerPage = 10

  // Sample in-progress applications
  const inProgressApplications = ref<InProgressApplication[]>([
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
      progressPercentage: 45,
      nextStep: 'Awaiting electrical evaluation',
      daysInProgress: 5,
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
      progressPercentage: 35,
      nextStep: 'Submit revised electrical plans',
      daysInProgress: 10,
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
      progressPercentage: 85,
      nextStep: 'Process payment',
      daysInProgress: 15,
    },
    {
      id: 'PRM-2026-006',
      applicantId: 'user-006',
      applicantName: 'Jessica Lee',
      submitType: 'building_permit',
      submissionClass: 'new_entry',
      projectDescription: 'Modern Apartment Complex',
      location: '654 Park Road, Residential District',
      status: 'under_review',
      documents: [{ id: 'doc-6', name: 'floor_plans.pdf' }],
      evaluations: [],
      remarks: 'Structural evaluation in progress',
      submittedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      progressPercentage: 55,
      nextStep: 'Complete structural evaluation',
      daysInProgress: 8,
    },
    {
      id: 'PRM-2026-007',
      applicantId: 'user-007',
      applicantName: 'Thomas Anderson',
      submitType: 'occupancy_permit',
      submissionClass: 're_entry',
      projectDescription: 'Restaurant Renovation',
      location: '987 Food Street, Downtown',
      status: 'deficiency_found',
      documents: [{ id: 'doc-7', name: 'renovation_plans.pdf' }],
      evaluations: [],
      remarks: 'Fire safety plan needs modification',
      submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      progressPercentage: 40,
      nextStep: 'Revise fire safety plan and resubmit',
      daysInProgress: 7,
    },
    {
      id: 'PRM-2026-008',
      applicantId: 'user-008',
      applicantName: 'Amanda Taylor',
      submitType: 'sign_permit',
      submissionClass: 'for_approval',
      projectDescription: 'Store Signage Installation',
      location: '111 Commerce Street, Retail Zone',
      status: 'for_payment',
      documents: [{ id: 'doc-8', name: 'sign_specs.pdf' }],
      evaluations: [],
      remarks: 'Design approval complete',
      submittedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      progressPercentage: 80,
      nextStep: 'Make payment and schedule installation',
      daysInProgress: 6,
    },
  ])

  // Filtered list
  const filteredApplications = computed(() => {
    let filtered = inProgressApplications.value

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        (app) =>
          app.projectDescription.toLowerCase().includes(query) ||
          app.applicantName.toLowerCase().includes(query) ||
          app.location.toLowerCase().includes(query) ||
          app.id.toLowerCase().includes(query),
      )
    }

    // Filter by status
    if (selectedStatuses.value.length > 0) {
      filtered = filtered.filter((app) => selectedStatuses.value.includes(app.status))
    }

    return filtered
  })

  // Sorted list
  const sortedApplications = computed(() => {
    const sorted = [...filteredApplications.value]
    sorted.sort((a, b) => {
      let aValue: any
      let bValue: any

      if (sortField.value === 'submittedAt') {
        aValue = new Date(a.submittedAt).getTime()
        bValue = new Date(b.submittedAt).getTime()
      } else if (sortField.value === 'projectDescription') {
        aValue = a.projectDescription
        bValue = b.projectDescription
      } else {
        aValue = a.applicantName
        bValue = b.applicantName
      }

      if (sortOrder.value === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return sorted
  })

  // Paginated list
  const paginatedApplications = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return sortedApplications.value.slice(startIndex, endIndex)
  })

  // Statistics
  const progressStats = computed<ProgressStats>(() => {
    const allApps = inProgressApplications.value

    return {
      totalInProgress: allApps.length,
      underReview: allApps.filter((a) => a.status === 'under_review').length,
      deficiencyFound: allApps.filter((a) => a.status === 'deficiency_found').length,
      forPayment: allApps.filter((a) => a.status === 'for_payment').length,
      averageDaysInProgress: Math.round(
        allApps.reduce((sum, a) => sum + a.daysInProgress, 0) / allApps.length,
      ),
    }
  })

  const totalPages = computed(() => Math.ceil(filteredApplications.value.length / itemsPerPage))

  const hasActiveFilters = computed(() => searchQuery.value || selectedStatuses.value.length > 0)

  // Methods
  function toggleStatusFilter(status: InProgressStatus) {
    const index = selectedStatuses.value.indexOf(status)
    if (index > -1) {
      selectedStatuses.value.splice(index, 1)
    } else {
      selectedStatuses.value.push(status)
    }
    currentPage.value = 1
  }

  function clearFilters() {
    searchQuery.value = ''
    selectedStatuses.value = []
    currentPage.value = 1
  }

  function toggleSortOrder() {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

  function goToPage(page: number) {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value))
  }

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  function getStatusColor(status: InProgressStatus) {
    return STATUS_COLOR_MAP[status] || 'bg-gray-100 text-gray-800'
  }

  function getPermitTypeColor(type: PermitType) {
    return PERMIT_TYPE_COLOR_MAP[type] || 'bg-blue-100 text-blue-800'
  }

  function formatSubmissionClass(value: string) {
    const map: Record<string, string> = {
      new_entry: 'New Entry',
      re_entry: 'Re-entry',
      for_approval: 'For Approval',
    }
    return map[value] || value
  }

  function formatPermitType(value: string) {
    const map: Record<string, string> = {
      building_permit: 'Building Permit',
      occupancy_permit: 'Occupancy Permit',
      sign_permit: 'Sign Permit',
    }
    return map[value] || value
  }

  function getProgressColor(percentage: number): string {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-blue-500'
    if (percentage >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return {
    searchQuery,
    selectedStatuses,
    sortField,
    sortOrder,
    currentPage,
    filteredApplications,
    paginatedApplications,
    progressStats,
    totalPages,
    hasActiveFilters,
    toggleStatusFilter,
    clearFilters,
    toggleSortOrder,
    goToPage,
    nextPage,
    prevPage,
    getStatusColor,
    getPermitTypeColor,
    formatSubmissionClass,
    formatPermitType,
    getProgressColor,
  }
}
