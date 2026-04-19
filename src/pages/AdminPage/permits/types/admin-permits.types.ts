export interface Category {
  id: string
  label: string
  icon: string
}

export interface PermitCategoryTabsProps {
  categories: Category[]
  selectedCategory: string
}

export interface CategoryDialogProps {
  showDialog: boolean
  newCategoryName: string
  newCategoryIcon: string
}

export interface Permit {
  id: string
  title: string
  description: string
  applicant: string
  location: string
  submittedDate: string
  status: 'approved' | 'pending' | 'in-review' | 'revision'
  statusLabel: string
  type: string
  progressPercent: number
}

export interface StatusOption {
  value: string
  label: string
  color: string
}

export type PermitsByType = Record<string, Permit[]>
