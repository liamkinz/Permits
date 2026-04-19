<script setup lang="ts">
import { TypographyH1 } from '@/components/ui/typography'
import DeniedHeader from './components/DeniedHeader.vue'
import DeniedStatsGrid from './components/DeniedStatsGrid.vue'
import DeniedList from './components/DeniedList.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header Section -->
    <DeniedHeader />

    <!-- Stats Grid Component -->
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <DeniedStatsGrid />
    </div>

    <!-- Denied Applications List Section -->
    <div class="px-4 sm:px-6 lg:px-8 py-4 pb-8">
      <DeniedList />
    </div>
  </div>
</template>
