import { computed, ref, reactive } from 'vue'

// Sample data structure for denied applications
import type { DeniedApplication } from '../types/admin-denied.types'

// Sample denied applications data
const sampleDeniedApplications: DeniedApplication[] = [
  {
    id: 'DEN-2024-001',
    projectDescription: 'Commercial Shopping Center Development',
    applicantName: 'John Smith Development Corp',
    location: '123 Main Street, Downtown',
    deniedDate: '2024-04-10',
    submittedDate: '2024-03-15',
    rejectionReason: 'incomplete',
    rejectionDetails: 'Missing environmental impact assessment and traffic study documentation.',
    submitType: 'new',
  },
  {
    id: 'DEN-2024-002',
    projectDescription: 'Residential Apartment Complex',
    applicantName: 'Urban Housing Solutions LLC',
    location: '456 Oak Avenue, Westside',
    deniedDate: '2024-04-08',
    submittedDate: '2024-03-20',
    rejectionReason: 'zoning',
    rejectionDetails:
      'Project violates zoning regulations for residential density in this district.',
    submitType: 'new',
  },
  {
    id: 'DEN-2024-003',
    projectDescription: 'Industrial Warehouse Expansion',
    applicantName: 'Metro Supply Chain Inc',
    location: '789 Industrial Blvd, East Zone',
    deniedDate: '2024-04-05',
    submittedDate: '2024-03-10',
    rejectionReason: 'noncompliance',
    rejectionDetails:
      'Does not meet current environmental compliance standards and safety regulations.',
    submitType: 'modification',
  },
  {
    id: 'DEN-2024-004',
    projectDescription: 'Retail Store Renovation',
    applicantName: 'Fashion Boutiques Ltd',
    location: '321 Market Street, Central',
    deniedDate: '2024-04-03',
    submittedDate: '2024-03-25',
    rejectionReason: 'incomplete',
    rejectionDetails:
      'Architectural drawings are incomplete and contractor licenses are not verified.',
    submitType: 'renewal',
  },
  {
    id: 'DEN-2024-005',
    projectDescription: 'Medical Clinic Operations',
    applicantName: 'Health Services Partners',
    location: '654 Health Plaza, North District',
    deniedDate: '2024-03-28',
    submittedDate: '2024-03-05',
    rejectionReason: 'other',
    rejectionDetails:
      'Application filed under incorrect permit category. Please resubmit with correct classification.',
    submitType: 'new',
  },
  {
    id: 'DEN-2024-006',
    projectDescription: 'Multi-Story Office Building',
    applicantName: 'Business Properties Group',
    location: '999 Corporate Drive, Business District',
    deniedDate: '2024-03-25',
    submittedDate: '2024-02-28',
    rejectionReason: 'noncompliance',
    rejectionDetails: 'Building design does not comply with ADA accessibility requirements.',
    submitType: 'new',
  },
]

export function useDeniedApplications() {
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = 10
  const sortField = ref<'deniedDate' | 'projectDescription' | 'applicantName'>('deniedDate')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  const applications = reactive<DeniedApplication[]>(sampleDeniedApplications)

  // Filtered applications based on search
  const filteredApplications = computed(() => {
    if (!searchQuery.value) {
      return applications
    }

    const query = searchQuery.value.toLowerCase()
    return applications.filter(
      (app) =>
        app.projectDescription.toLowerCase().includes(query) ||
        app.applicantName.toLowerCase().includes(query) ||
        app.location.toLowerCase().includes(query) ||
        app.rejectionDetails.toLowerCase().includes(query),
    )
  })

  // Sorted applications
  const sortedApplications = computed(() => {
    const sorted = [...filteredApplications.value]
    sort(sorted, sortField.value, sortOrder.value)
    return sorted
  })

  // Paginated applications
  const paginatedApplications = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedApplications.value.slice(start, end)
  })

  // Total pages
  const totalPages = computed(() => {
    return Math.ceil(filteredApplications.value.length / itemsPerPage)
  })

  // Denied statistics
  const deniedStats = computed(() => {
    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1)

    const totalDenied = applications.length
    const deniedThisMonth = applications.filter(
      (app) => new Date(app.deniedDate) >= thisMonth,
    ).length

    // Count rejection reasons
    const rejectionReasons = {
      incomplete: applications.filter((app) => app.rejectionReason === 'incomplete').length,
      noncompliance: applications.filter((app) => app.rejectionReason === 'noncompliance').length,
      zoning: applications.filter((app) => app.rejectionReason === 'zoning').length,
      other: applications.filter((app) => app.rejectionReason === 'other').length,
    }

    // Calculate average processing time
    const processingTimes = applications.map((app) => {
      const submitted = new Date(app.submittedDate)
      const denied = new Date(app.deniedDate)
      return Math.floor((denied.getTime() - submitted.getTime()) / (1000 * 60 * 60 * 24))
    })
    const averageProcessingDays = Math.ceil(
      processingTimes.reduce((a, b) => a + b, 0) / applications.length,
    )

    // Estimate denial rate (assuming ~100 total submissions)
    const denialRate = Math.ceil((totalDenied / 100) * 100)

    return {
      totalDenied,
      deniedThisMonth,
      pendingAppeal: 2, // Sample data
      appealApproved: 1, // Sample data
      averageProcessingDays,
      denialRate: isNaN(denialRate) ? 5 : Math.min(denialRate, 100),
      rejectionReasons,
    }
  })

  // Helper functions
  function sort(arr: DeniedApplication[], field: string, order: string) {
    arr.sort((a, b) => {
      let aVal: any = a[field as keyof DeniedApplication]
      let bVal: any = b[field as keyof DeniedApplication]

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      if (aVal < bVal) return order === 'asc' ? -1 : 1
      if (aVal > bVal) return order === 'asc' ? 1 : -1
      return 0
    })
  }

  function toggleSortOrder() {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
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

  function clearFilters() {
    searchQuery.value = ''
    currentPage.value = 1
  }

  function getRejectionReasonColor(
    reason: 'incomplete' | 'noncompliance' | 'zoning' | 'other',
  ): string {
    const colors: Record<'incomplete' | 'noncompliance' | 'zoning' | 'other', string> = {
      incomplete: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
      noncompliance: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
      zoning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
      other: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100',
    }
    return colors[reason]
  }

  function formatRejectionReason(reason: string): string {
    const labels: Record<string, string> = {
      incomplete: 'Incomplete Docs',
      noncompliance: 'Non-Compliance',
      zoning: 'Zoning Violation',
      other: 'Other',
    }
    return labels[reason] || reason
  }

  function formatSubmissionClass(type: string): string {
    const labels: Record<string, string> = {
      new: 'New Application',
      renewal: 'Renewal',
      modification: 'Modification',
    }
    return labels[type] || type
  }

  const hasActiveFilters = computed(() => {
    return searchQuery.value.length > 0
  })

  return {
    searchQuery,
    currentPage,
    totalPages,
    sortField,
    sortOrder,
    filteredApplications,
    sortedApplications,
    paginatedApplications,
    deniedStats,
    hasActiveFilters,
    toggleSortOrder,
    goToPage,
    nextPage,
    prevPage,
    clearFilters,
    getRejectionReasonColor,
    formatRejectionReason,
    formatSubmissionClass,
  }
}

export function getDaysAgo(dateString: string): number {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
