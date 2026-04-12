<script setup lang="ts">
import { TypographyH1 } from '@/components/ui/typography'
import { useAuthStore } from '@/stores/authStore'
import InProgressHeader from './components/InProgressHeader.vue'
import ProgressStatsGrid from './components/ProgressStatsGrid.vue'
import InProgressList from './components/InProgressList.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header Section -->
    <InProgressHeader />

    <!-- Stats Grid Component -->
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <ProgressStatsGrid />
    </div>

    <!-- In-Progress Applications List Section -->
    <div class="px-4 sm:px-6 lg:px-8 py-4 pb-8">
      <InProgressList />
    </div>
  </div>
</template>
