import { ClipboardList, Upload, RefreshCw, BadgeCheck } from 'lucide-vue-next'

export function useHowItWorksSection() {
  const steps = [
    {
      icon: ClipboardList,
      step: '01',
      title: 'Create Your Application',
      description:
        'Select the permit type, fill out our smart guided form, and answer only the questions relevant to your project.',
      accent:
        'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    },
    {
      icon: Upload,
      step: '02',
      title: 'Attach Documents',
      description:
        'Upload site plans, insurance certificates, and any required supporting documents — all in one place.',
      accent:
        'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800',
    },
    {
      icon: RefreshCw,
      step: '03',
      title: 'Track Progress',
      description:
        'Monitor review status, respond to comments from inspectors, and get real-time updates at every stage.',
      accent:
        'bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-800',
    },
    {
      icon: BadgeCheck,
      step: '04',
      title: 'Receive Approval',
      description:
        'Download your approved permit digitally, share with contractors, and store it securely in the cloud.',
      accent:
        'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    },
  ]

  return { steps }
}
