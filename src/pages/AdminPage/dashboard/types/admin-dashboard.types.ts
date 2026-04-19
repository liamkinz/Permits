// Type definitions for Admin Dashboard

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

export interface DashboardStats {
  totalApplications: number
  pendingReview: number
  underReview: number
  approved: number
  deficiencyFound: number
}

export interface RecentApplication extends PermitApplication {
  applicantName: string
}

export interface StatusDistribution {
  status: string
  count: number
  color: string
}
export interface Application {
  id: string
  applicantName: string
  permitType: string
  submittedDate: string
  dueDate: string
  daysRemaining: number
}
