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

export type InProgressStatus = Extract<
  PermitStatus,
  'under_review' | 'deficiency_found' | 'for_payment'
>

export interface InProgressApplication extends PermitApplication {
  status: InProgressStatus
  progressPercentage: number
  nextStep: string
  daysInProgress: number
}

export interface ProgressStats {
  totalInProgress: number
  underReview: number
  deficiencyFound: number
  forPayment: number
  averageDaysInProgress: number
}
