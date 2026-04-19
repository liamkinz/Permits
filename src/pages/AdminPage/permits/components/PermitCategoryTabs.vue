<script setup lang="ts">
import { Card } from '@/components/ui/card'
import type { PermitCategoryTabsProps } from '../types/admin-permits.types'
import { TypographyH1, TypographyP } from '@/components/ui/typography'

defineProps<PermitCategoryTabsProps>()
defineEmits<{
  categoryChange: [value: string]
  addCategory: []
}>()
</script>

<template>
  <div class="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur-md shadow-lg">
    <div class="px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col gap-4">
        <!-- Title -->
        <div class="flex flex-col gap-1">
          <TypographyH1 class="text-2xl md:text-3xl font-bold text-gradient-primary">
            Permit Management
          </TypographyH1>
          <TypographyP class="text-muted-foreground text-sm md:text-base">
            Browse and manage all types of permits in one place
          </TypographyP>
        </div>

        <!-- Category Tabs -->
        <div class="flex flex-wrap gap-2 pt-2 overflow-x-auto pb-2 scrollbar-hide my-5">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="$emit('categoryChange', category.id)"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap',
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg scale-105'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border',
            ]"
          >
            <span class="text-lg">{{ category.icon }}</span>
            {{ category.label }}
          </button>
          <!-- Add New Category Button -->
          <button
            @click="$emit('addCategory')"
            class="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-500/90 hover:to-emerald-600/90 shadow-lg hover:shadow-xl"
            title="Add a new permit category"
          >
            <span class="text-lg">➕</span>
            Add Category
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
