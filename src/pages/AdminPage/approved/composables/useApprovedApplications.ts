import { ref, computed } from 'vue'
import type {
  ApprovedApplication,
  ApprovedStats,
  PermitType,
  PermitStatus,
} from '../types/approved.types'

// Helper to get days ago
export const getDaysAgo = (timestamp: string): number => {
  const days = Math.floor((Date.now() - new Date(timestamp).getTime()) / (24 * 60 * 60 * 1000))
  return Math.max(days, 0)
}

// Helper to get days until date
export const getDaysUntil = (timestamp: string): number => {
  const days = Math.floor((new Date(timestamp).getTime() - Date.now()) / (24 * 60 * 60 * 1000))
  return days
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

export function useApprovedApplications() {
  const searchQuery = ref('')
  const sortField = ref<'approvedDate' | 'projectDescription' | 'applicantName'>('approvedDate')
  const sortOrder = ref<'asc' | 'desc'>('desc')
  const currentPage = ref(1)
  const itemsPerPage = 10

  // Sample approved applications
  const approvedApplications = ref<ApprovedApplication[]>([
    {
      id: 'PRM-2025-101',
      applicantId: 'user-101',
      applicantName: 'James Wilson',
      submitType: 'building_permit',
      submissionClass: 'new_entry',
      projectDescription: 'Downtown Shopping Mall Extension',
      location: '500 Main Plaza, Downtown',
      status: 'approved',
      documents: [{ id: 'doc-101', name: 'approved_plans.pdf' }],
      evaluations: [],
      remarks: 'All conditions satisfied',
      submittedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      approvedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      approvalNumber: 'APR-2025-001',
      validityPeriod: 365,
      expiresOn: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2025-102',
      applicantId: 'user-102',
      applicantName: 'Patricia Brown',
      submitType: 'occupancy_permit',
      submissionClass: 're_entry',
      projectDescription: 'Hospital Renovation - West Wing',
      location: '250 Health Avenue, Medical District',
      status: 'approved',
      documents: [{ id: 'doc-102', name: 'final_inspection.pdf' }],
      evaluations: [],
      remarks: 'Safety standards met',
      submittedAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      approvedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      approvalNumber: 'APR-2025-002',
      validityPeriod: 730,
      expiresOn: new Date(Date.now() + 700 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2025-103',
      applicantId: 'user-103',
      applicantName: 'David Martinez',
      submitType: 'sign_permit',
      submissionClass: 'for_approval',
      projectDescription: 'Corporate Office Branding',
      location: '1000 Business Park Road',
      status: 'approved',
      documents: [{ id: 'doc-103', name: 'sign_approval.pdf' }],
      evaluations: [],
      remarks: 'Design compliant',
      submittedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      approvedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      approvalNumber: 'APR-2025-003',
      validityPeriod: 180,
      expiresOn: new Date(Date.now() + 170 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2025-104',
      applicantId: 'user-104',
      applicantName: 'Linda Garcia',
      submitType: 'building_permit',
      submissionClass: 'new_entry',
      projectDescription: 'Residential Townhouse Development',
      location: '2000 Oak Ridge Drive',
      status: 'approved',
      documents: [{ id: 'doc-104', name: 'site_plan.pdf' }],
      evaluations: [],
      remarks: 'Structural compliance verified',
      submittedAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
      approvedDate: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
      approvalNumber: 'APR-2025-004',
      validityPeriod: 365,
      expiresOn: new Date(Date.now() + 315 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2025-105',
      applicantId: 'user-105',
      applicantName: 'Robert Taylor',
      submitType: 'occupancy_permit',
      submissionClass: 'for_approval',
      projectDescription: 'Retail Store Renovation',
      location: '500 Shopping Center Blvd',
      status: 'approved',
      documents: [{ id: 'doc-105', name: 'inspection_report.pdf' }],
      evaluations: [],
      remarks: 'Fire safety clearance approved',
      submittedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      approvedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      approvalNumber: 'APR-2025-005',
      validityPeriod: 365,
      expiresOn: new Date(Date.now() + 350 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'PRM-2025-106',
      applicantId: 'user-106',
      applicantName: 'Margaret Chen',
      submitType: 'building_permit',
      submissionClass: 're_entry',
      projectDescription: 'Commercial Office Building',
      location: '3000 Corporate Avenue',
      status: 'approved',
      documents: [{ id: 'doc-106', name: 'final_approval.pdf' }],
      evaluations: [],
      remarks: 'All standards met',
      submittedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
      approvedDate: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
      approvalNumber: 'APR-2025-006',
      validityPeriod: 730,
      expiresOn: new Date(Date.now() + 660 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ])

  // Filtered list
  const filteredApplications = computed(() => {
    let filtered = approvedApplications.value

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        (app) =>
          app.projectDescription.toLowerCase().includes(query) ||
          app.applicantName.toLowerCase().includes(query) ||
          app.location.toLowerCase().includes(query) ||
          app.id.toLowerCase().includes(query) ||
          app.approvalNumber.toLowerCase().includes(query),
      )
    }

    return filtered
  })

  // Sorted list
  const sortedApplications = computed(() => {
    const sorted = [...filteredApplications.value]
    sorted.sort((a, b) => {
      let aValue: any
      let bValue: any

      if (sortField.value === 'approvedDate') {
        aValue = new Date(a.approvedDate).getTime()
        bValue = new Date(b.approvedDate).getTime()
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
  const approvedStats = computed<ApprovedStats>(() => {
    const allApps = approvedApplications.value
    const now = Date.now()
    const thirtyDaysFromNow = now + 30 * 24 * 60 * 60 * 1000

    return {
      totalApproved: allApps.length,
      approvedThisMonth: allApps.filter(
        (a) => new Date(a.approvedDate).getTime() > now - 30 * 24 * 60 * 60 * 1000,
      ).length,
      expiringSoon: allApps.filter(
        (a) =>
          new Date(a.expiresOn).getTime() <= thirtyDaysFromNow &&
          new Date(a.expiresOn).getTime() > now,
      ).length,
      expired: allApps.filter((a) => new Date(a.expiresOn).getTime() <= now).length,
      averageProcessingDays: Math.round(
        allApps.reduce(
          (sum, a) =>
            sum +
            Math.floor(
              (new Date(a.approvedDate).getTime() - new Date(a.submittedAt).getTime()) /
                (24 * 60 * 60 * 1000),
            ),
          0,
        ) / allApps.length,
      ),
    }
  })

  const totalPages = computed(() => Math.ceil(filteredApplications.value.length / itemsPerPage))

  const hasActiveFilters = computed(() => searchQuery.value)

  // Methods
  function clearFilters() {
    searchQuery.value = ''
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

  function getExpiryStatus(expiresOn: string): 'expired' | 'expiring_soon' | 'valid' {
    const daysUntil = getDaysUntil(expiresOn)
    if (daysUntil <= 0) return 'expired'
    if (daysUntil <= 30) return 'expiring_soon'
    return 'valid'
  }

  function getExpiryColor(expiresOn: string): string {
    const status = getExpiryStatus(expiresOn)
    switch (status) {
      case 'expired':
        return 'bg-red-500'
      case 'expiring_soon':
        return 'bg-yellow-500'
      default:
        return 'bg-green-500'
    }
  }

  return {
    searchQuery,
    sortField,
    sortOrder,
    currentPage,
    filteredApplications,
    paginatedApplications,
    approvedStats,
    totalPages,
    hasActiveFilters,
    clearFilters,
    toggleSortOrder,
    goToPage,
    nextPage,
    prevPage,
    getPermitTypeColor,
    formatSubmissionClass,
    formatPermitType,
    getExpiryStatus,
    getExpiryColor,
  }
}
