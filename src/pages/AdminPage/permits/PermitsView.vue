<script setup lang="ts">
import PermitCategoryTabs from './components/PermitCategoryTabs.vue'
import Category from './components/Category.vue'
import { useAdminPermit } from './composables/useAdminPermit'

const {
  selectedCategory,
  categories,
  showAddCategoryDialog,
  newCategoryName,
  newCategoryIcon,
  handleAddCategory,
} = useAdminPermit()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
    <!-- Category Tabs -->
    <PermitCategoryTabs
      :categories="categories"
      :selected-category="selectedCategory"
      @category-change="selectedCategory = $event"
      @add-category="showAddCategoryDialog = true"
    />

    <!-- Add Category Dialog Component -->
    <Category
      :showDialog="showAddCategoryDialog"
      :newCategoryName="newCategoryName"
      :newCategoryIcon="newCategoryIcon"
      @close="showAddCategoryDialog = false"
      @add-category="handleAddCategory"
      @update:newCategoryName="newCategoryName = $event"
      @update:newCategoryIcon="newCategoryIcon = $event"
    />
  </div>
</template>
