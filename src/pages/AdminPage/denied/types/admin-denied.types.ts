export interface DeniedApplication {
  id: string
  projectDescription: string
  applicantName: string
  location: string
  deniedDate: string
  submittedDate: string
  rejectionReason: 'incomplete' | 'noncompliance' | 'zoning' | 'other'
  rejectionDetails: string
  submitType: 'new' | 'renewal' | 'modification'
}

export interface DeniedStats {
  totalDenied: number
  deniedThisMonth: number
  pendingAppeal: number
  appealApproved: number
  averageProcessingDays: number
  denialRate: number
  rejectionReasons: {
    incomplete: number
    noncompliance: number
    zoning: number
    other: number
  }
}
