// Type definitions
export type PermitStatus =
  | 'pending'
  | 'under_review'
  | 'deficiency_found'
  | 'for_payment'
  | 'approved'

export type SubmissionClass = 'new_entry' | 're_entry' | 'for_approval'

export type PermitType = 'building_permit' | 'occupancy_permit' | 'sign_permit'

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

export interface ApprovedApplication extends PermitApplication {
  status: 'approved'
  approvedDate: string
  approvalNumber: string
  validityPeriod: number // in days
  expiresOn: string
}

export interface ApprovedStats {
  totalApproved: number
  approvedThisMonth: number
  expiringSoon: number // expires within 30 days
  expired: number // already expired
  averageProcessingDays: number
}
