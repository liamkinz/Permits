<script setup lang="ts">
import type { CategoryDialogProps } from '../types/admin-permits.types'

defineProps<CategoryDialogProps>()

const emit = defineEmits<{
  close: []
  'add-category': []
  'update:newCategoryName': [value: string]
  'update:newCategoryIcon': [value: string]
}>()
</script>

<template>
  <div
    v-if="showDialog"
    class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
  >
    <div class="bg-card rounded-xl border border-border p-6 max-w-md w-full shadow-xl">
      <h2 class="text-xl font-bold mb-4">Add New Permit Category</h2>
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium mb-2 block">Category Name</label>
          <input
            :value="newCategoryName"
            @input="emit('update:newCategoryName', ($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="e.g., Fire Safety Permits"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label class="text-sm font-medium mb-2 block">Icon Emoji (optional)</label>
          <input
            :value="newCategoryIcon"
            @input="emit('update:newCategoryIcon', ($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="e.g., 🔥"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            maxlength="2"
          />
        </div>
      </div>
      <div class="flex gap-3 mt-6">
        <button
          @click="emit('close')"
          class="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
        >
          Cancel
        </button>
        <button
          @click="emit('add-category')"
          class="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary/90 hover:to-purple-600/90 transition-colors"
        >
          Add Category
        </button>
      </div>
    </div>
  </div>
</template>
