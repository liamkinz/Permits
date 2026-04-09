import type { Component } from 'vue'
import { Clock, Search, AlertTriangle, CreditCard, CheckCircle2 } from 'lucide-vue-next'

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
