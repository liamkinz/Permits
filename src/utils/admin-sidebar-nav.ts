import {
  BarChart3,
  Users,
  FileText,
  Settings,
  LayoutDashboard,
  Bell,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-vue-next'

export const navigationItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { label: 'Applications', icon: BarChart3, href: '/admin/applications' },
  { label: 'Permits', icon: FileText, href: '/admin/permits' },
  { label: 'Users', icon: Users, href: '#' },
  { label: 'In Progress', icon: Clock, href: '/admin/inprogress' },
  { label: 'Denied', icon: AlertCircle, href: '/admin/denied' },
  { label: 'Approved', icon: CheckCircle, href: '/admin/approved' },
]

export const menuItems = [
  { label: 'Settings', icon: Settings, href: '#' },
  { label: 'Help & Support', icon: Bell, href: '#' },
]
