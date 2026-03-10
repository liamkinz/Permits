import { ref } from 'vue'

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
