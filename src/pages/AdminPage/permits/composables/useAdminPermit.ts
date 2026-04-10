import { ref } from 'vue'
import type { Category } from '../types/admin-permits.types'

export function useAdminPermit() {
  // State
  const selectedCategory = ref('building')
  const categories = ref<Category[]>([
    { id: 'building', label: 'Building Permits', icon: '🏗️' },
    { id: 'electrical', label: 'Electrical Permits', icon: '⚡' },
    { id: 'plumbing', label: 'Plumbing Permits', icon: '🔧' },
    { id: 'mechanical', label: 'Mechanical Permits', icon: '⚙️' },
    { id: 'environmental', label: 'Environmental Permits', icon: '🌱' },
    { id: 'other', label: 'Other Permits', icon: '📋' },
  ])

  const showAddCategoryDialog = ref(false)
  const newCategoryName = ref('')
  const newCategoryIcon = ref('')

  // Methods
  const handleAddCategory = () => {
    if (newCategoryName.value.trim()) {
      const newId = newCategoryName.value.toLowerCase().replace(/\s+/g, '-')
      categories.value.push({
        id: newId,
        label: newCategoryName.value,
        icon: newCategoryIcon.value || '📋',
      })
      selectedCategory.value = newId
      newCategoryName.value = ''
      newCategoryIcon.value = ''
      showAddCategoryDialog.value = false
    }
  }

  return {
    // State
    selectedCategory,
    categories,
    showAddCategoryDialog,
    newCategoryName,
    newCategoryIcon,

    // Methods
    handleAddCategory,
  }
}
