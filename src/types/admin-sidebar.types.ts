import { ref } from 'vue'

// Types
export interface NavigationItem {
  label: string
  icon: any
  href: string
}

export interface MenuItem {
  label: string
  icon: any
  href: string
}

// Composable
const isOpen = ref(true)
const isMobileOpen = ref(false)

export function useAdminSidebar() {
  const toggleSidebar = () => {
    isOpen.value = !isOpen.value
  }

  const toggleMobileSidebar = () => {
    isMobileOpen.value = !isMobileOpen.value
  }

  const closeMobileSidebar = () => {
    isMobileOpen.value = false
  }

  return { isOpen, isMobileOpen, toggleSidebar, toggleMobileSidebar, closeMobileSidebar }
}
